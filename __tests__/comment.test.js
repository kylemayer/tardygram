const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
    await Comment.insert({
      username: 'testuser',
      comment: 'Happy Birthday, Maria! uwu owo'
    });

    const res = await request(app)
      .post('/api/v1/comments')
      .send({
        comment: 'Happy Birthday, Maria! uwu owo'
      });

    expect(res.body).toEqual({
      username: 'testuser',
      comment: 'Happy Birthday, Maria! uwu owo'
    });
  });
});
