import pool from '../utils/pool.js';

export default class Post {
  id;
  title;
  body;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.body = row.body;
  }

  static async createPost({ title, body }) {
    const { rows } = await pool.query(
      `INSERT INTO posts (title, body)
        VALUES ($1, $2)
        RETURNING *`,
        [title, body]
    );
    return new Post(rows[0]);
  }

  static async findPostById(id) {
    const { rows } = await pool.query(
      `SELECT *
        FROM posts
        WHERE id = $1`,
        [id]
    );
    return new Post(rows[0]);
  }

  static async findAllPosts() {
    const { rows } = await pool.query(
      `SELECT * 
        FROM posts`
    );
    return rows.map(row => new Post(row));
  }

  static async updatePostById(id, title, body) {
    const { rows } = await pool.query(
      `UPDATE posts 
        SET title = $1, 
            body = $2
        WHERE id = $3
        RETURNING id, title, body`,
        [title, body, id]
    );
    return new Post(rows[0]);
  }

  static async deletePostById(id) {
    const { rows } = await pool.query(
      `DELETE FROM posts
        WHERE id = $1
        RETURNING *`,
        [id]
    );
    return new Post(rows[0]);
  }
}