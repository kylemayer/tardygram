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

  .get('/:username', async (req, res, next) => {
    try {
      const { username } = req.params;
      const user = await User.getByUsername(username);
      res.send(user);
    } catch(err) {
      next(err);
    }
  });
