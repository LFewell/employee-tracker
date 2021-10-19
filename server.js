const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
// require('dotenv').config()

const PORT = process.env.PORT || 3001;
const app = express();

// Do I need this middleware?
// app.use(express.urlencoded({ extended: false}));
// app.use(express.json());

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "admin",
        database: "employee_db"
    },
    console.log(`Connected to the employee_db database.`)
);

const init = () => {
    console.log("Employee Manager ASCII Art")
    inquirer.prompt(
        {
            name: "intro",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
        }
    )
    .then((answer) => {
        switch(answer.intro) {
            case "Add Employee":
                addEmployee();
                break;
            case "View Employees":
                viewEmployees();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "View All Departments":
                viewDepartments();
                break;
        }
    }) 
}

const addEmployee = () => {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?",
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?",
        },
        {
            name: "roleId",
            type: "number",
            message: "What is the employee's role number?"
        },
        // {
        //     name: "managerId",
        //     type: "input",
        //     message: "Who is the employees manager? (leave blank if none)"
        // }
    ])
    .then((answer) => {
        db.query(
            `INSERT INTO employee SET ?`,
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleId,
                // manager_id: answer.managerId
                
            },
            init()
        )
    })
}

const addDepartment = () => {
    inquirer.prompt([
        {
            name: "addDepartment",
            type: "input",
            message: "What is the name of the new department?"
        }
    ])
    .then((answer) => {
        db.query(
            `INSERT INTO department SET ?`,
            {
                name: answer.addDepartment
            },
            init()
        )
    })
}

const addRole = () => {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the title for this role?"
        },
        {
            name: "salary",
            type: "number",
            message: "What is the salary for this role?"
        },
        {
            name: "departmentId",
            type: "number",
            message: "What is the department number?"
        },
    ])
    .then ((answer) => {
        db.query(
            `INSERT INTO role SET ?`,
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.departmentId
            },
            init()
        )
    })
}

const viewEmployees = () => {
    db.query(`SELECT id AS EmployeeID, CONCAT(first_name, last_name) AS Employees, role_id AS Role from employee`, (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    });
}

const viewDepartments = () => {
    db.query(`SELECT title AS Title, department_id AS Department FROM role`, (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    })
}
init();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });