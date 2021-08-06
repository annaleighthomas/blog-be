CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  body VARCHAR,
  date_created TIMESTAMP likes INT DEFAULT 0
);