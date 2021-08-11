const express = require('express');
const app = express();
const postsController = require('./controllers/posts.js');
const usersController = require('./controllers/users.js');

app.use(express.json());

app.use('/api/v1/users', usersController);
app.use('/api/v1/posts', postsController);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
