BEGIN;

DROP TABLE IF EXISTS users, reviews CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  review TEXT,
  postdate Date
);

-- INSERT INTO users (username, email, password) VALUES ('aa', 'a@a', '123');

-- INSERT INTO reviews (user_id, Review, postDate) VALUES (1, 'random', now());

COMMIT;

