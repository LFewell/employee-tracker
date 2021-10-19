const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");

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
        if (answer.intro === "Add Employee"){
            addEmployee();
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
        }
    ])
    .then((answer) => {
        db.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleId
                
            }
        )
    })
}

init();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });