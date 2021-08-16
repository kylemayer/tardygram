const pool = require('../utils/pool');

module.exports = class Post {
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
              `INSERT INTO posts (comment_by, post, comment)
            VALUES ($1, $2, $3)
            RETURNING *`,
              [comment_by, post, comment]
            );

            return Comment(rows[0]);
      }
}