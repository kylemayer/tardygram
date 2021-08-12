const pool = require('../utils/pool');

module.exports = class Post {
  id;
  username;
  avatarUrl;
  caption;
  tags;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.avatarUrl = row.avatar_url;
    this.caption = row.caption;
    this.tags = row.tags;
  }

  static async insert({ username, avatarUrl, caption, tags }) {
    const { rows } = await pool.query(
      `INSERT INTO posts (username, avatar_url, caption, tags)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
      [username, avatarUrl, caption, tags]
    );

    return new Post(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM posts');
    return rows.map((row) => new Post(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM posts WHERE id=$1', [id]);

    return new Post(rows[0]);
  }

  static async update(id, { username, caption }) {
    const { rows } = await pool.query(
      `UPDATE posts SET caption=$1 WHERE username=$2 AND id=$3 RETURNING *`,
      [caption, username, id]
    );
    return new Post(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM posts WHERE id=$1 RETURNING *',
      [id]
    );

    return new Post(rows[0]);
  }
};
