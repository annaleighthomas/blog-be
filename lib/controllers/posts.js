import { Router } from 'express';
import Post from '../models/Post.js';

export default Router()
  .post('/api/v1/posts', async (req, res) => {
    try {
      const post = await Post.createPost(req.body);
      res.send(post);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/posts/:id', async (req, res) => {
    try {
      const post = await Post.findPostById(req.params.id);
      res.send(post);
    } catch (err) {
      res.status(500).send ({ error: err.message });
    }
  })

  .get('/api/v1/posts', async (req, res) => {
    try {
      const post = await Post.findAllPosts();
      res.send(post);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .put('/api/v1/posts/:id', async (req, res) => {
    try {
      const post = await Post.updatePostById(req.params.id, req.body.title, req.body.body, req.body.dateCreated);
      res.send(post);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/posts/:id', async (req, res) => {
    try {
      await Post.deletePostById(req.params.id);
      res.send({ status: 'success', message: 'delete success' });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
