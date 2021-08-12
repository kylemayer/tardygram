const { Router } = require('express');
const Post = require('../models/Post.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const post = await Post.insert({
        ...req.body,
        username: 'testuser',
      });

      res.send(post);
    } catch (err) {
      next(err);
    }
  })

  .get('/posts', async (req, res, next) => {
    try {
      const posts = await Post.getAll();
      res.send(posts);
    } catch(err) {
      next(err);
    }
  });
