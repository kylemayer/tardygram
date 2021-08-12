const pool = require('../utils/pool');

class User {
    username;
    avatarUrl;

    constructor(row) {
        this.username = row.github_username;
        this.avatarUrl = row.github_avatar_url;
    }

    static async insert(username, avatarUrl) {
        console.log(avatarUrl, '-------------');
        const { rows } = await pool.query(
            `INSERT INTO users (github_username, github_avatar_url)
            VALUES ($1, $2)
            RETURNING *`,
            [username, avatarUrl]
        );

        return new User(rows[0]);
    }

    static async getByUsername(username) {
        const { rows } = await pool.query(
            'SELECT * FROM users WHERE github_username=$1', [username]);

            // if (!rows[0]) return null;
            return new User(rows[0]);
    }
};

module.exports = User;