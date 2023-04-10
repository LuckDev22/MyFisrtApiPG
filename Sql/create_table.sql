CREATE DATABASE movie;

CREATE TABLE IF NOT EXISTS movie(
    id SERIAL   PRIMARY KEY,
    name        VARCHAR(50) NOT NULL,
    category    VARCHAR(20) NOT NULL,
    duration    INTEGER     NOT NULL,
    price       INTEGER     NOT NULL
);


INSERT INTO
    movie
    ("name", "category","duration","price")
VALUES
    ('Divertidamente', 'animação',120,35)
RETURNING
    *;


SELECT
    *
FROM
    movie
WHERE
    id = 1;


UPDATE
    movie
SET
    (duration) = ROW(1210)
WHERE
    id = 21
RETURNING
    *;

DELETE FROM
    movie
WHERE
    id = $1