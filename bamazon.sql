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