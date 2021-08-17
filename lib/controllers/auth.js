const { Router } = require('express');
const UserService = require('../services/UserService.js');
const jwt = require('jsonwebtoken');
const ensureAuth = require('../middleware/ensure-auth');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=read:user`
    );
  })
  .get('/login/callback', async (req, res, next) => {
    try {
      const user = await UserService.create(req.query.code);
      const userJwt = jwt.sign(user.toJSON(), process.env.APP_SECRET, {
        expiresIn: '24h',
      });

      res.cookie('session', userJwt, {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
      });

      res.redirect('/api/v1/auth/verify');
    } catch(err) {
      next(err);
    }
  })
  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });
