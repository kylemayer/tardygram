const pool = require('../utils/pool');

class User {
    id;
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


};

module.exports = User;