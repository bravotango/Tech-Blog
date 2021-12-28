const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ],
      where: { user_id: req.session.user_id },
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/add', withAuth, (req, res) => {
  res.render('addpost', {
    user_id: req.session.user_id,
  });
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
      res.status(404).json({ message: 'No post with this id.' });
      return;
    }
    const post = postData.get({ plain: true });
    res.render('dashboard', post);
  } catch (err) {
    res.status(500).json(err);
  }

  res.render('addpost', {
    user_id: req.session.user_id,
  });

  // const painting = dbPaintingData.get({ plain: true });
  // res.render('painting', { painting, loggedIn: req.session.loggedIn });
});

module.exports = router;
