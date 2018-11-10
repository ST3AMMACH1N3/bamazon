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
    let options = ["View Products for Sale", "View Low Inventory", "Add to inventory", "Add New Product"];
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
        }
        connection.end();
    });
}

mainMenu();
