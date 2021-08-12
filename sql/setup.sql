DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE users (
    github_username TEXT NOT NULL PRIMARY KEY,
    github_avatar_url TEXT NOT NULL
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL REFERENCES users(github_username),
    photo_url TEXT NOT NULL,
    caption TEXT,
    tags TEXT[]
);

