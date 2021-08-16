const { Router } = require('express');
const Comment = require('../models/Comment.js');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const comment = await Comment.insert({
      ...req.body,
      comment_by: 'testuser',
    });
    
    res.send(comment);
  } catch(err) {
    next(err);
  }
  
});
