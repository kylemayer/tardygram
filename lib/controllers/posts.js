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

  .get('/', async (req, res, next) => {
    try {
      const posts = await Post.getAll();
      res.send(posts);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;

      const post = await Post.getById(id);

      res.send(post);
    } catch(error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const updatedPost = await Post.update(req.params.id, {
        ...req.body
      });
      res.send(updatedPost);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;

      const post = await Post.deleteById(id);

      res.send({
        message: 'that junk gone',
      });
    } catch(error) {
      next(error);
    }
  });
