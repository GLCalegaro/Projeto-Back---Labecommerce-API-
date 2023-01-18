-- Active: 1673883071555@@127.0.0.1@3306
CREATE TABLE users (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL
);

INSERT INTO users (id, email, password)
VALUES 
("1", "celiaD@email.com", "celeide123"),
("2", "wilson@email.com", "wilson1946"),
("3", "susie@email.com", "adminsusie");

CREATE TABLE products (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	name TEXT NOT NULL,
	price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES 
("A1", "Torta de limão - 1,5kg", 75.00, "Alimentos"),
("B2", "Pudim de nutella - 900g", 80.00, "Alimentos"),
("C3", "Microfone HyperX Solocast", 389.90, "Acessórios de Áudio e Vídeo"),
("D4", "Smartphone Samsung Galaxy A23 128GB", 1300.00, "Celular e Smartphone
"),
("E5", "Notebook Gamer Acer Nitro 5", 4458.00, "Notebook");

SELECT * from products
WHERE name LIKE "%micro%";

SELECT * FROM users;

SELECT * FROM products;

INSERT INTO users (id, email, password)
VALUES 
("4", "marceloc@email.com", "iqsc*783");

INSERT INTO products (id, name, price, category)
VALUES 
("F6", "Console Xbox Series S", 2380.85, "Games e Consoles");

SELECT * from products
WHERE id = "A1";

DELETE FROM users
WHERE id = "4";

DELETE FROM products
WHERE id = "F6";

UPDATE users
SET
	email = "wilsonc@email.com",
	password = "apolo1946"
WHERE id = 2; 

UPDATE products
SET
	name = "Pudim de nutella",
	price = 19.90
WHERE id = "B2"; 

SELECT * FROM users
ORDER BY email ASC;

SELECT * FROM products
ORDER BY price ASC;

SELECT * FROM products
WHERE price <= 20
LIMIT 20;

SELECT * FROM products
WHERE price <= 100 AND price <= 300
ORDER BY price ASC;

CREATE TABLE purchases (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	total_price REAL NOT NULL,
	paid INTEGER NOT NULL,
    delivered_at TEXT NULL,
	buyer_id TEXT NOT NULL,
	FOREIGN KEY (buyer_id) REFERENCES users(id)
);

DROP TABLE purchases;

SELECT * FROM purchases;

INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
VALUES
("Purch1", 58.40, 0, NULL, "1"),
("Purch2", 144.47, 0, NULL, "2");
INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
VALUES
("Purch3", 178.50, 0, NULL, "3");
INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
VALUES
("Purch4", 389.90, 0, NULL, "1");

SELECT * FROM users --TABELA users
INNER JOIN purchases --TABELA purchases
ON purchases.buyer_id = users.id;

UPDATE purchases
SET
	delivered_at = datetime('now','localtime')
	WHERE buyer_id = "1"; 

SELECT * from purchases
WHERE buyer_id = "3";