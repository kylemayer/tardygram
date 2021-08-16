const { Router } = require('express');
const Comment = require('../models/Comment.js');
const User = require('../models/User.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const comment = await Comment.insert({
        ...req.body,
        comment_by: 'testuser',
      });

      res.send(comment);
    } catch(err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    if(User.username === Comment.comment_by) {
      try {
        const { id } = req.params;
        await Comment.deleteById(id);

        res.send({
          message: `comment ${res.comment} has been deleted`,
        });
      } catch(err) {
        next(err);
      }
    }
  });
