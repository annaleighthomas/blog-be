import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Post from '../lib/models/Post.js';

describe('post routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a post using POST', async () => {
    const res = await request(app)
      .post('/api/v1/posts')
      .send({ 
        title: 'first post', 
        body: 'some text'
      });

    expect(res.body).toEqual({
      id: '1',
      title: 'first post',
      body: 'some text'
    });
  });

  it('retrieves a specific post by id using GET', async () => {
    const post = await Post.createPost({
      title: 'first post', 
      body: 'some text'
    });
    
    const res = await request(app)
      .get(`/api/v1/posts/${post.id}`);
    
    expect(res.body).toEqual(post);
  });

  it('retrieves all posts using GET', async () => {
    const post1 = await Post.createPost({
      title: 'first post', 
      body: 'some text'
    });

    const post2 = await Post.createPost({
      title: 'second post', 
      body: 'some text'
    });

    const post3 = await Post.createPost({
      title: 'third post', 
      body: 'some text'
    });

    const res = await request(app)
      .get('/api/v1/posts');

    expect(res.body).toEqual([post1, post2, post3]);
  });

  it('updates a cat using PUT', async () => {
    const post = await Post.createPost({
      title: 'first post', 
      body: 'some text'
    });

    const res = await request(app)
      .put(`/api/v1/posts/${post.id}`)
      .send({
        title: 'second post',
        body: 'some test'
      });

    expect(res.body).toEqual({
      id: '1',
      title: 'second post',
      body: 'some test'
    });
  });

  it('deletes a cat using DELETE', async () => {
    const post = await Post.createPost({
      title: 'first post',
      body: 'some text'
    });

    const res = await request(app)
      .delete(`/api/v1/posts/${post.id}`);

    expect(res.body).toEqual({
      status: 'success',
      message:'delete success'
    });
  });
});

