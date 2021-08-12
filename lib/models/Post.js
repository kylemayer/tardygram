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

    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM posts',
            )
            return rows.map((row) => new Post(row))
        }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM posts WHERE id=$1', [id]);

        return new Post(rows[0]);
    }
  };
