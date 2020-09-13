// const express = require('express');
// const router = express.Router();

// // @route   GET api/posts
// // @desc    Test route
// // @access  Public
// router.get('/', (req, res) => res.send('Posts route'));

// module.exports = router;

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');

// @route   GET api/posts
// @desc    Test route
// @access  Public
router.post(
  '/',

  //Some validation on the body content
  [
    check('title', 'Name is required').not().isEmpty(),
    check('body', 'Post Body is required').not().isEmpty(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }

    //Pull the user details from the request body
    const { title, body } = req.body;

    try {
      // Check to see if user already exists in the db
      let post = await Post.findOne({ title });

      if (post) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Post already exists' }] });
      }
      //create a new user (it's not saved yet)
      post = new Post({
        title,
        body,
      });

      //Save the user to the DB
      await post.save();

      res.send('Post Created');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error: ' + err.message);
    }
  }
);

module.exports = router;
