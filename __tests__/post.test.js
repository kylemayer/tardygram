const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User.js');
const Post = require('../lib/models/Post.js');

// const caption = { caption: 'bri is a soi boi' };

describe('tardygram post routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates an image with a caption via POST', async () => {
    await User.insert({
      username: 'testuser',
      avatarUrl: 'http://example.com/image.png',
      caption: 'captiony caption',
      tags: ['taggy', 'soi', 'boi'],
    });

    const res = await request(app)
      .post('/api/v1/posts')
      .send({
        // user: user.id,
        avatarUrl: 'http://example.com/image2.png',
        caption: 'image caption',
        tags: ['sunny', 'summer', 'water'],
      });

    expect(res.body).toEqual({
      id: '1',
      username: 'testuser',
      avatarUrl: 'http://example.com/image2.png',
      caption: 'image caption',
      tags: ['sunny', 'summer', 'water'],
    });
  });

  it('gets a list of posts', async () => {
    await User.insert({
      username: 'testuser',
      avatarUrl: 'http://example.com/image.png',
      caption: 'captiony caption',
      tags: ['taggy', 'soi', 'boi'],
    });

    const post1 = {
      username: 'testuser',
      avatarUrl: '/some-image.jpg',
      caption: 'new image',
      tags: ['one', 'two', 'three'],
    };

    const post2 = {
      username: 'testuser',
      avatarUrl: '/some-other-image.jpg',
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
    await User.insert({
      username: 'testuser',
      avatarUrl: 'http://example.com/image.png',
      caption: 'captiony caption',
      tags: ['taggy', 'soi', 'boi'],
    });

    await request(app)
      .post('/api/v1/posts')
      .send({
        // user: user.id,
        avatarUrl: 'http://example.com/image2.png',
        caption: 'image caption',
        tags: ['sunny', 'summer', 'water'],
      });

    const res = await request(app).get('/api/v1/posts/1');
    expect(res.body).toEqual({
      id: '1',
      username: 'testuser',
      avatarUrl: 'http://example.com/image2.png',
      caption: 'image caption',
      tags: ['sunny', 'summer', 'water'],
    });
  });

  it('updates the caption on a post via PATCH', async () => {
    await User.insert('brionlykindasux111', 'http://example.com/image2.png');
    await Post.insert({
      username: 'brionlykindasux111',
      avatarUrl: 'http://example.com/image2.png',
      caption: 'image caption',
      tags: ['sunny', 'summer', 'water'],
    });

    return request(app)
      .patch('/api/v1/posts/1')
      .send({
        username: 'brionlykindasux111',
        caption: 'bri is a soi boi',
        avatarUrl: 'http://example.com/image2.png',
        tags: ['sunny', 'summer', 'water'],
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          username: 'brionlykindasux111',
          avatarUrl: 'http://example.com/image2.png',
          caption: 'bri is a soi boi',
          tags: ['sunny', 'summer', 'water'],
        });
      });
  });

  it('deletes post by id', async () => {
    await User.insert({
      username: 'testuser',
      avatarUrl: 'http://example.com/image.png',
      caption: 'captiony caption',
      tags: ['taggy', 'soi', 'boi'],
    });

    await request(app)
      .post('/api/v1/posts')
      .send({
        // user: user.id,
        avatarUrl: 'http://example.com/image2.png',
        caption: 'image caption',
        tags: ['sunny', 'summer', 'water'],
      });

    const res = await request(app).delete('/api/v1/posts/1');
    expect(res.body).toEqual({
      message: 'that junk gone',
    });
  });

  it('gets the top 10 most popular posts via GET', async () => {
    await User.insert();








  });
});
