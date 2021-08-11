const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User.js');
const users = require('../lib/controllers/users');

describe('tardygram routes', () => {
  beforeEach(() => {
    return setup(pool);
  });


  it.skip('verify route displays the currently logged in user via GET', async () => {
    const res = await request(app).get('/api/v1/auth/verify');

    expect(res.body).toEqual({
      username: 'testuser',
      avatarUrl: 'http://example.com/image.png',
    });
  });

  it('gets a user by id via GET', async () => {
    await User.insert({ 
      username: 'testuser',
      avatarUrl: 'http://example.com/image.png',
    });

    const res = await request(app).get(`/api/v1/users/${users.id}`);

    expect(res.body).toEqual({ 
      id: 1,
      username: 'testuser',
      avatarUrl: 'http://example.com/image.png',
    });
  });
});
