const pool = require('../utils/pool');

module.exports = class Comment {
  id;
  comment_by;
  post;
  comment;

  constructor(row) {
    this.id = row.id;
    this.comment_by = row.comment_by;
    this.post = row.post;
    this.comment = row.comment;
  }

  static async insert({ comment_by, post, comment }) {
    const { rows } = await pool.query(
      `INSERT INTO comments (comment_by, post, comment)
            VALUES ($1, $2, $3)
            RETURNING *`,
      [comment_by, post, comment]
    );
    return new Comment(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM comments WHERE id=$1 RETURNING *', [id]
    );
    return new Comment(rows[0]);
  }
};