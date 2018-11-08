require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect(err => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    displayProducts();
});

function displayProducts() {
    connection.query('SELECT item_id, product_name, price FROM `products`', (err, res) => {
        if (err) throw err;
        console.table(res);
    });
    connection.end();
}