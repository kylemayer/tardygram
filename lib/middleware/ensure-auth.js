const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  try {
    const { session } = req.cookies;
    const payload = jwt.verify(session, process.env.APP_SECRET);
    req.user = payload;
    next();
  } catch(err) {
    err.status = 401;
    err.message = 'You must be logged in to continue';
    next(err);
  }
};
