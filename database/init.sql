BEGIN;

DROP TABLE IF EXISTS users, blog_posts CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES FOREIGN KEY users(id),
  Review TEXT,
  PostDate dateTime.now
);

INSERT INTO users (username, email, password) VALUES
;

INSERT INTO reviews (text_content, user_id,Review,PostDate) VALUES
;

COMMIT;