DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

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


CREATE TABLE comments (
     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
     comment_by TEXT NOT NULL REFERENCES users(github_username),
     post BIGINT NOT NULL REFERENCES posts(id),
     comment TEXT NOT NULL
)

