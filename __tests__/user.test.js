const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User.js');
// const users = require('../lib/controllers/users');

describe('tardygram routes', () => {
  beforeEach(() => {
    return setup(pool);
  });


  it('verify route displays the currently logged in user via GET', async () => {
    const res = await request(app).get('/api/v1/auth/verify');

    expect(res.body).toEqual({
      username: 'testuser',
      avatarUrl: 'http://example.com/image.png',
    });
  });

  it('gets a user by username via GET', async () => {
    const dummy = 'testuser';
    const dummyPicture = 'http://example.com/image.png';
    const dummyUser = await User.insert(dummy, dummyPicture);

    const res = await request(app).get(`/api/v1/users/${dummyUser.username}`);

    expect(res.body).toEqual({
      username: 'testuser',
      avatarUrl: 'http://example.com/image.png',
    });
  });
});
