import pool from '../utils/pool.js';

export default class Post {
  id;
  title;
  body;
  date_created;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.body = row.body;
    this.date_created = row.dateCreated;
  }

  static async createPost({ title, body, dateCreated }) {
    const { rows } = await pool.query(
      `INSERT INTO posts (title, body, date_created)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [title, body, dateCreated]
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
    return new postMessage(rows[0]);
  }

  static async findAllPosts() {
    const { rows } = await pool.query(
      `SELECT * 
        FROM posts`
    );
    return rows.map(row => new Post(row));
  }

  static async updatePostById(id, title, body, dateCreated) {
    const { rows } = await pool.query(
      `UPDATE posts 
        SET title = $1, 
            body = $2,
            dateCreated = $3
        WHERE id = $4
        RETURNING id, title, body, date_created`,
        [title, body, dateCreated, id]
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