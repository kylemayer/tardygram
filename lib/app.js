const express = require('express');
const app = express();
const postsController = require('./controllers/posts.js');
const usersController = require('./controllers/users.js');
const authController = require('./controllers/auth');
const commentsController = require('./controllers/comments');

app.use(express.static(`${__dirname}/../public`));
app.use(express.json());
app.use(require('cookie-parser')());

app.use('/api/v1/auth', authController);
app.use('/api/v1/users', usersController);
app.use('/api/v1/posts', postsController);
app.use('/api/v1/comments', commentsController);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
