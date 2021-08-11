DROP TABLE IF EXISTS users;

CREATE TABLE users (
    github_login TEXT NOT NULL PRIMARY KEY,
    github_avatar_url TEXT NOT NULL
);