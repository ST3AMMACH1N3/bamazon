DROP DATABASE IF EXISTS bamazon; 

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(9,2),
    stock_quantity INT DEFAULT 0,
    units_sold INT DEFAULT 0,
    PRIMARY KEY (item_id)
);

CREATE TABLE departments (
	department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50),
    over_head_costs DECIMAL(18,2) ,
    PRIMARY KEY (department_id)
);


INSERT INTO `products` (product_name, department_name, price, stock_quantity)
VALUES ('T-shirt', 'Clothing', 9.99, 15), ('Polo', 'Clothing', 14.99, 10), ('Jeans', 'Clothing', 34.99, 7),
	   ('Keyboard', 'Electronics', 11.99, 7), ('Laptop', 'Electronics', 1099.95, 5), ('Charging Cable', 'Electronics', 5.99, 50),
       ('Apple', 'Grocery', 1.49, 100), ('Banana', 'Grocery', 0.24, 45), ('Chips', 'Grocery', 3.49, 20), ('Soda', 'Grocery', 1.99, 30);
       
INSERT INTO departments(department_name, over_head_costs)
VALUES ('Clothing', 95.50), ('Electronics', 150.05), ('Grocery', 174.99);