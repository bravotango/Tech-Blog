const router = require('express').Router();
const { Post, User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id,
    });
    return res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });
    return res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['username'] }],
    });
    if (!postData) {
      res.status(404).json({ message: 'No posts with requested id.' });
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
