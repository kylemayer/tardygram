const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User.js');

describe('tardygram routes', () => {
  beforeEach(() => {
    return setup(pool);
  });


  it('verify route displays the currently logged in user via GET', async () => {

    console.log('I am running a test');
    const res = await request(app).get('/api/v1/auth/verify');

    expect(res.body).toEqual({
      username: 'test_user',
      avatarUrl: 'http://example.com/image.png',
    });
  });

  it('creates an image with a caption via POST', async () => {
    const user = await User.insert({
      username: 'test_user',
      avatarURL: 'http://example.com/image.png',
    });

    const res = await request(app)
      .post('/api/v1/posts')
      .send({
        user: user.id,
        photo_url: 'http://example.com/image2.png',
        caption: 'image caption',
        tags: ['sunny', 'summer', 'water']
      });

    expect(res.body).toEqual({
      id: '1',
      photo_url: 'http://example.com/image2.png',
      caption: 'image caption',
      tags: ['sunny', 'summer', 'water']
    });
  });


});

