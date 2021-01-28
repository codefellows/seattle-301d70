-- All commands are pasted here so that we can reference them later


CREATE DATABASE lab14_301d70_normal2 WITH TEMPLATE lab14_301d70; 

CREATE TABLE AUTHORS (id SERIAL PRIMARY KEY, name VARCHAR(255));

INSERT INTO authors(name) SELECT DISTINCT author FROM books;

ALTER TABLE books ADD COLUMN author_id INT;

UPDATE books SET author_id=author.id FROM (SELECT * FROM authors) AS author WHERE books.author = author.name;

ALTER TABLE books ADD CONSTRAINT fk_authors FOREIGN KEY (author_id) REFERENCES authors(id);