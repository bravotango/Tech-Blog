const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create({
      content: req.body.content,
      user_id: req.body.user_id,
      post_id: req.body.post_id,
    });
    return res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
