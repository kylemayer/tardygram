const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User.js');

const post = {
  photoUrl: '/some-image.jpg',
  caption: 'new image',
  tags: ['one', 'two', 'three'],
};

describe('tardygram post routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates an image with a caption via POST', async () => {
    await User.insert('testuser', 'http://example.com/image.png');

    const res = await request(app)
      .post('/api/v1/posts')
      .send({
        // user: user.id,
        photo_url: 'http://example.com/image2.png',
        caption: 'image caption',
        tags: ['sunny', 'summer', 'water'],
      });

    expect(res.body).toEqual({
      id: '1',
      username: 'testuser',
      photo_url: 'http://example.com/image2.png',
      caption: 'image caption',
      tags: ['sunny', 'summer', 'water'],
    });
  });

  it('gets a list of posts', async () => {
    await User.insert('testuser', 'http://example.com/image.png');

    const post = {
      photoUrl: '/some-image.jpg',
      caption: 'new image',
      tags: ['one', 'two', 'three'],
    };

    const post2 = {
      photoUrl: '/some-other-image.jpg',
      caption: 'other new image',
      tags: ['one', 'two', 'four'],
    };

    return request(app)
      .get('/api/v1/posts')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 1,
            ...post,
          },
          {
            id: 2,
            ...post2,
          },
        ]);
      });
  });
});
