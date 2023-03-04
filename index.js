// Import and require mysql2
const db = require('./db/connnection');
console.log(db);
// Import and require inquirer
const inquirer = require('inquirer');

function promptChoices() {
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
          'View all employees',
          'Add an employee',
          'Update an employee role',
          'View all roles',
          'Add a role',
          'View all departments',
          'Add a Department',
          'Quit',
        ],
      },
    ])
    .then(answers => {
      console.log(answers);
      // Use user feedback for... whatever!!
    })
    .catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

function viewAllEmployees() {}

function addEmployee() {}

function updateEmployeeRole() {}

function viewAllRoles() {}

function addRole() {}

function viewAllSepartments() {}

function AddDepartment() {}

function quit() {}
