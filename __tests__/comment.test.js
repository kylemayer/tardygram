const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Comment = require('../lib/models/Comment.js');
const User = require('../lib/models/User.js');
const Post = require('../lib/models/Post.js');

jest.mock('../lib/middleware/ensure-auth.js', () => (req, res, next) => {
  req.user = {
    username: 'testuser',
    avatarUrl: 'http://example.com/image.png',
  };
  next();
});

describe('comment routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('posts a comment and the username of the poster', async () => {
    await User.insert('testuser', 'http://example.com/image.png');

    await Post.insert({
      username: 'testuser',
      avatarUrl: 'http://example.com/image2.png',
      caption: 'image caption',
      tags: ['sunny', 'summer', 'water'],
    });

    const res = await request(app).post('/api/v1/comments').send({
      post: '1',
      comment_by: 'testuser',
      comment: 'Happy Birthday, Maria! uwu owo',
    });

    expect(res.body).toEqual({
      id: '1',
      post: '1',
      comment_by: 'testuser',
      comment: 'Happy Birthday, Maria! uwu owo',
    });
  });
  it('deletes comment by id', async () => {
    await User.insert('testuser', 'http://example.com/image.png');

    await Post.insert({
      username: 'testuser',
      avatarUrl: 'http://example.com/image2.png',
      caption: 'image caption',
      tags: ['sunny', 'summer', 'water'],
    });

    await request(app).post('/api/v1/comments').send({
      post: '1',
      comment_by: 'testuser',
      comment: 'Happy Birthday, Maria! uwu owo',
    });
    const res = await request(app).delete('/api/v1/comments/1');

    expect(res.body).toEqual({
      message: `comment ${res.comment} has been deleted`
    });
  });
});
