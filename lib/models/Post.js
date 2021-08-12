const pool = require('../utils/pool');

module.exports = class Post {
    id;
    username;
    photo_url;
    caption;
    tags;

    constructor(row) {
        this.id = row.id;
        this.username = row.username;
        this.photo_url = row.photo_url;
        this.caption = row.caption;
        this.tags = row.tags;
    }

    static async insert({ username, photo_url, caption, tags }) {
        const { rows } = await pool.query(
            `INSERT INTO posts (username, photo_url, caption, tags)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [username, photo_url, caption, tags])

        return new Post(rows[0]);
    }
  };
