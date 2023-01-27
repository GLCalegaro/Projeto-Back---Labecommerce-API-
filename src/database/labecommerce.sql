-- Active: 1673883071555@@127.0.0.1@3306
CREATE TABLE users (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	name TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
	createdAt TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL
);

DROP TABLE users;

INSERT INTO users (id, name, email, password)
VALUES 
("1", "Celia", "celiaD@email.com", "celeide123"),
("2", "Wilson", "wilson@email.com", "wilson1946"),
("3", "Susie", "susie@email.com", "adminsusie");

CREATE TABLE products (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	name TEXT NOT NULL,
	price REAL NOT NULL,
    description TEXT NOT NULL,
	imageUrl TEXT NOT NULL 
);

DROP TABLE products;

INSERT INTO products (id, name, price, description, imageUrl)
VALUES 
("A1", "Torta de limão - 1,5kg", 75.00, "Alimentos", "https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/1d22d96039f98608bc9338debb1b4579.jpg.webp?itok=EgI5mW4B"),
("B2", "Pudim de nutella - 900g", 80.00, "Alimentos", "https://i0.wp.com/blogchefcenter.com.br/wp-content/uploads/2018/06/7b07ae11-b576-475a-895e-11e600311230.jpg?fit=600%2C600&ssl=1"),
("C3", "Microfone HyperX Solocast", 389.90, "Acessórios de Áudio e Vídeo", "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/h/m/hmis1x-xx-bkg1.jpg"),
("D4", "Smartphone Samsung Galaxy A23 128GB", 1300.00, "Celular e Smartphone", "https://images.samsung.com/is/image/samsung/p6pim/br/sm-a235mlbgzto/gallery/br-galaxy-a23-sm-a235-sm-a235mlbgzto-531826303?$650_519_PNG$"),
("E5", "Notebook Gamer Acer Nitro 5", 4458.00, "Notebook", "https://conteudoproduto.magazineluiza.com.br/23/234883900/assets/images/layout/header-image.png");

SELECT * from products
WHERE name LIKE "%micro%";

SELECT * FROM users;

SELECT * FROM products;

INSERT INTO users (id, name, email, password)
VALUES 
("4", "Marcelo", "marceloc@email.com", "iqsc*783");

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
	createdAt TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
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

CREATE TABLE purchases_products (
	purchase_id TEXT NOT NULL,
	product_id TEXT NOT NULL,
	quantity INTEGER NOT NULL,
	create_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
	FOREIGN KEY (purchase_id) REFERENCES purchases(id)
	FOREIGN KEY (product_id) REFERENCES products(id)
);

SELECT * FROM purchases_products;

DROP TABLE purchases_products;

INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES ("Purch1", "A1", 2),
        ("Purch2", "B2", 3),
        ("Purch3", "D4", 1),
		("Purch1", "C3", 2);

SELECT	-- removendo ambiguidade e aplicando camelCase com ALIAS
    pu.id AS purchaseId,
    pu.total_price AS totalPrice,
    pu.paid,
	pu.delivered_at AS deliverDate,
	pu.buyer_id AS buyerID,
	pr.id AS productId,
	pr.name AS productName,
	pp.quantity
FROM purchases AS pu
left JOIN purchases_products AS pp
ON pp.purchase_id = pu.id
inner JOIN products AS pr
ON pp.product_id = pr.id




