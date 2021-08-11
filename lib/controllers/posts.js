const { Router } = require('express');
const Post = require('../models/Post.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const post = await Post.insert({
        ...req.body,
        username: 'testuser'
      });
      
      res.send(post);
    } catch(err) {
      next(err);
    }
  });
