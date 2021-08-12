const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User.js');

const caption = { caption: 'elise is a soi boi' };

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

    const post1 = {
      username: 'testuser',
      photo_url: '/some-image.jpg',
      caption: 'new image',
      tags: ['one', 'two', 'three'],
    };

    const post2 = {
      username: 'testuser',
      photo_url: '/some-other-image.jpg',
      caption: 'other new image',
      tags: ['one', 'two', 'four'],
    };
    await request(app).post('/api/v1/posts').send(post1);
    await request(app).post('/api/v1/posts').send(post2);

    return request(app)
      .get('/api/v1/posts')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: '1',
            ...post1,
          },
          {
            id: '2',
            ...post2,
          },
        ]);
      });
  });

  it('gets post by id', async () => {
    await User.insert('testuser', 'http://example.com/image.png');

    await request(app)
      .post('/api/v1/posts')
      .send({
        // user: user.id,
        photo_url: 'http://example.com/image2.png',
        caption: 'image caption',
        tags: ['sunny', 'summer', 'water'],
      });

    const res = await request(app).get('/api/v1/posts/1');
    expect(res.body).toEqual({
      id: '1',
      username: 'testuser',
      photo_url: 'http://example.com/image2.png',
      caption: 'image caption',
      tags: ['sunny', 'summer', 'water'],
    });
  });

  it('deletes post by id', async () => {
    await User.insert('testuser', 'http://example.com/image.png');

    await request(app)
      .post('/api/v1/posts')
      .send({
        // user: user.id,
        photo_url: 'http://example.com/image2.png',
        caption: 'image caption',
        tags: ['sunny', 'summer', 'water'],
      });

    const res = await request(app).delete('/api/v1/posts/1');
    expect(res.body).toEqual({
      message: 'that junk gone',
    });
  });
  it('updates the caption on a post via PATCH', async () => {
    await User.insert('testuser', 'http://example.com/image.png');
    await request(app)
      .post('/api/v1/posts')
      .send({
        photo_url: 'http://example.com/image2.png',
        caption: 'image caption',
        tags: ['sunny', 'summer', 'water'],
      });
    return request(app)
      .patch('/api/v1/posts/1')
      .send({ caption: 'elise is a soi boi' })
      .then((res) => {
        expect(res.body).toEqual({
          photo_url: 'http://example.com/image2.png',
          caption: 'elise is a soi boi',
          tags: ['sunny', 'summer', 'water'],
        });
      });
  });
});
