DROP TABLE cattoys;
DROP TABLE cats;
DROP TABLE toys;


CREATE TABLE cats(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    breed VARCHAR(255) NOT NULL
);

CREATE TABLE toys(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL
);

CREATE TABLE cattoys(
    id SERIAL PRIMARY KEY,
    cat_id INTEGER NOT NULL,
    toy_id INTEGER NOT NULL,

    FOREIGN KEY (cat_id) REFERENCES cats(id),
    FOREIGN KEY (toy_id) REFERENCES toys(id)
);





--15 INSERT statements 

INSERT INTO
    cats
    (name, color, breed)
VALUES
    ('Pepper', 'Gray', 'American Shorthair'),
    ('Noodle', 'Tan', 'American Bobtail'),
    ('Jaz', 'White', 'Siamese'),
    ('Kai', 'Orange', 'Persian'),
    ('Buns', 'Brown', 'Siberian');


INSERT INTO
    toys
    (name, color, price)
VALUES
    ('Laser', 'Red', 5),
    ('Catnip', 'Green', 6),
    ('Wand', 'Blue', 8),
    ('Squeak Toy', 'Yellow', 4),
    ('Cat Tower', 'Leopard Print', 80);

INSERT INTO
    cattoys
    (cat_id, toy_id)
VALUES
    ((SELECT id 
    FROM cats
    WHERE name = 'Pepper'), 
    (SELECT id
    FROM toys
    WHERE name = 'Laser')),

    ((SELECT id 
    FROM cats
    WHERE name = 'Buns'), 
    (SELECT id
    FROM toys
    WHERE name = 'Wand')),

    ((SELECT id 
    FROM cats
    WHERE name = 'Noodle'), 
    (SELECT id
    FROM toys
    WHERE name = 'Cat Tower')),

    ((SELECT id 
    FROM cats
    WHERE name = 'Jaz'), 
    (SELECT id
    FROM toys
    WHERE name = 'Squeak Toy')),

    ((SELECT id 
    FROM cats
    WHERE name = 'Kai'), 
    (SELECT id
    FROM toys
    WHERE name = 'Catnip'))
;
