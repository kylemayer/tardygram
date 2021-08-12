// const pool = require('../lib/utils/pool');
// const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User.js');

it('creates an image with a caption via POST', async () => {
  const user = await User.insert('testuser', 'http://example.com/image.png'
  );

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
    username: 'testuser',
    photo_url: 'http://example.com/image2.png',
    caption: 'image caption',
    tags: ['sunny', 'summer', 'water'],
  });
});