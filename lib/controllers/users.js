const { Router } = require('express');
const User = require('../models/User.js');

module.exports = Router()
  .get('/:username/posts', async (req, res, next) => {
    try {
      const user = await User.findByUserWithPosts(req.params.username);

      res.send(user);
    } catch(err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const user = {
        id: 1,  
        username: 'testuser',
        avatarUrl: 'http://example.com/image.png',
      };
      res.send(user);
    } catch(err) {
      next(err);
    }
  });
