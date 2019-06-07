-- CREATE DATABASE book_review_app;
DROP TABLE reviews;
DROP TABLE books;
DROP TABLE users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(200),
    password VARCHAR(500)
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    author VARCHAR(500),
    title VARCHAR(500)
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    review TEXT,
    score INT,
    book_id  INT REFERENCES books(id),
    user_id INT REFERENCES users(id)
);