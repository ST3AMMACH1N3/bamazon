require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect(err => {
    if (err) throw err;
});

function mainMenu() {
    let options = ["View Product Sales by Department", "Create New Department", "Exit"];
    inquirer.prompt([
        {
            name: "options",
            type: "list",
            choices: options
        }
    ]).then(response => {
        switch (response.options) {
            case options[0]:
                viewSales();
                break;
            case options[1]:
                createDepartment();
                break;
            case options[2]:
                connection.end();
                break;
        }

    });
}

function viewSales() {
    connection.query('SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.price, products.units_sold  FROM `departments` INNER JOIN `products` ON departments.department_name = products.department_name', (err, res) => {
        if (err) throw err;
        let table = [];
        let departments = [];
        res.forEach(elem => {
            if (!departments.includes(elem.department_id)) {
                table.push({
                    department_id: elem.department_id,
                    department_name: elem.department_name,
                    over_head_costs: elem.over_head_costs,
                    product_sales: elem.units_sold * elem.price,
                    total_profit: elem.units_sold * elem.price - elem.over_head_costs
                })
                departments.push(elem.department_id);
            } else {
                table.forEach(dep => {
                    if (dep.department_id === elem.department_id) {
                        dep.product_sales += elem.units_sold * elem.price;
                        dep.total_profit += elem.units_sold * elem.price;
                        return;;
                    }
                });
            }
        });
        console.table(table);
        connection.end();
    });
}

mainMenu();