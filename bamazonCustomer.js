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
let numOfItems;

connection.connect(err => {
    if (err) throw err;
    displayProducts();
});

function displayProducts() {
    connection.query('SELECT item_id, product_name, price FROM `products`', (err, res) => {
        if (err) throw err;
        console.table(res);
        numOfItems = res.length;
        createTransaction();
    });
}

function createTransaction() {
    connection.query('SELECT item_id, product_name, price FROM `products`', (err, res) => {
        if (err) throw err;
    });
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'Please enter the ID of the the product you would like to purchase.',
            validate: function(input) {
                input  = parseInt(input);
                if (input > 0 && input <= numOfItems) {
                    return true;
                }
                return "Please input a valid ID.";
            }
        },
        {
            name: 'number',
            type: 'input',
            message: 'How many would you like to purchase?',
            validate: function(input) {
                input = parseInt(input);
                if (input >= 0) {
                    return true;
                }
                return "Please input a valid order number.";
            }
        }
    ]).then(response => {
        checkValidTransaction(parseInt(response.id), parseInt(response.number));
    });
}

function checkValidTransaction(id, num) {
    connection.query('SELECT stock_quantity FROM `products` WHERE ?', {item_id: id}, (err, res) => {
        if (err) throw err;
        if (num < res[0].stock_quantity) {
            completeTransaction(id, res[0].stock_quantity, num);
        } else {
            console.log("Insufficient quantity!");
            createTransaction();
        }
    });
}

function completeTransaction(id, stock, num) {
    connection.query('UPDATE `products` SET ? WHERE ?', [{stock_quantity: stock - num}, {item_id: id}], err => {
        if (err) throw err;
        connection.query('SELECT price FROM `products` WHERE ?', {item_id: id}, (err, res) => {
            if (err) throw err;
            console.log (`Your total is $${num * res[0].price}`);
            connection.end();
        });
    });
}