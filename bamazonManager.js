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
});

function mainMenu() {
    let options = ["View Products for Sale", "View Low Inventory", "Add to inventory", "Add New Product", "Exit"];
    inquirer.prompt([
        {
            name: "options",
            type: "list",
            choices: options,
        }
    ]).then(response => {
        switch (response.options) {
            case options[0]:
                viewProducts();
                break;
            case options[1]:
                viewLowInventory();
                break;
            case options[2]:
                addInventory();
                break;
            case options[3]:
                addProduct();
                break;
            case options[4]:
                connection.end();
                break;
        }
    });
}

function viewProducts() {
    connection.query('SELECT item_id, product_name, price, stock_quantity FROM `products`', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function viewLowInventory() {
    connection.query('SELECT * FROM `products` WHERE stock_quantity < 5', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function addInventory() {
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'Please enter the ID of the product you would like to stock to',
            validate: function(input) {
                input  = parseInt(input);
                if (input > 0) {
                    return true;
                }
                return "Please input a valid ID.";
            }
        },
        {
            name: 'amount',
            type: 'input',
            message: 'Please enter the amount of stock you would like to add to the product',
            validate: function(input) {
                input  = parseInt(input);
                if (input >= 0) {
                    return true;
                }
                return "Please input a valid amount.";
            }
        }
    ]).then(response => {
        let id = parseInt(response.id);
        let amount = parseInt(response.amount);
        connection.query('SELECT stock_quantity FROM `products` WHERE ?', {item_id: id}, (err, res) => {
            if (err) throw err;
            connection.query('UPDATE `products` SET ? WHERE ?', [{stock_quantity: res[0].stock_quantity + amount}, {item_id: id}], err => {
                if (err) throw err;
                console.log("Stock updated succeessfully!");
                mainMenu();
            });
        });
    });
}

mainMenu();