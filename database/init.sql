BEGIN;

DROP TABLE IF EXISTS users, blog_posts CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  Review TEXT
  -- PostDate dateTime.now
);

--  INSERT INTO users (username, email, password) VALUES ('saher', 'heythere@gmail.com', '123456');

-- INSERT INTO reviews (text_content, user_id,Review,PostDate) VALUES
-- ;

COMMIT;

