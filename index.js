// Import and require mysql2
const db = require('./db/connnection');
// console.log(db);
// Import and require inquirer
const inquirer = require('inquirer');
const consoleTable = require('console.table');
// ASCII-art Logo
const logo = require('asciiart-logo');
const config = require('./package.json');

console.log(logo(config).render());

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
      switch (answers.choice) {
        case 'View all employees':
          viewAllEmployees();
          break;

        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'View all roles':
          viewAllRoles();
          break;

        case 'Add a role':
          addRole();
          break;

        case 'View all departments':
          viewAllDepartments();
          break;

        case 'Add a Department':
          AddDepartment();
          break;
        case 'Quit':
        default:
          break;
      }
    })
    .catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

promptChoices();

// view functions
function viewAllDepartments() {
  // Query database
  db.query('SELECT * FROM department', function (err, results) {
    if (err) throw err;
    // console.log('Hello');
    console.table(results);
    promptChoices();
  });
}

function viewAllRoles() {
  db.query('SELECT * FROM role', function (err, results) {
    if (err) throw err;
    console.table(results);
    promptChoices();
  });
  // promptChoices();
}

function viewAllEmployees() {
  db.query('SELECT * FROM employee', function (err, results) {
    if (err) throw err;
    console.table(results);
    promptChoices();
  });
  // promptChoices();
}

// add functions
function AddDepartment() {
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: 'input',
        name: 'depName',
        message: 'What is the name of the department?',
      },
    ])
    .then(answers => {
      // Use user feedback for... whatever!!

      promptChoices();
    })
    .catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

function addRole() {
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the role?',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?',
      },
      {
        type: 'list',
        name: 'department',
        message: 'Which department does the role belong to?',
        choices: ['Engineering', 'Fanance', 'Legal', 'Sales', 'Service'],
      },
    ])
    .then(answers => {
      // Use user feedback for... whatever!!

      promptChoices();
    })
    .catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

function addEmployee() {
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: 'input',
        name: 'firstName',
        message: 'What is the employee’s first name?',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'What is the employee’s last name??',
      },
      {
        type: 'list',
        name: 'role',
        message: 'What is the employee’s role?',
        choices: [
          'Sales Lead',
          'Sales Person',
          'Software Ingineer',
          'Account Manager',
          'Accountant',
          'Legal Team Lead',
          'Lawyer',
          'Lead Engineer',
        ],
      },
      {
        type: 'list',
        name: 'manager',
        message: "Who is the employee's manager?",
        choices: ['None', 'John Dow', 'Mike Chan', 'Ashley Rodiguez'],
      },
    ])
    .then(answers => {
      // Use user feedback for... whatever!!

      promptChoices();
    })
    .catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: 'list',
        name: 'employee',
        message: 'Which employee’s role do you want to update?',
        choices: ['John Dow', 'Mike Chan', 'Ashley Rodiguez'],
      },
      {
        type: 'list',
        name: 'role',
        message: 'Which role do you want to assign  the selected employee?',
        choices: [
          'Sales Lead',
          'Sales Person',
          'Software Ingineer',
          'Account Manager',
          'Accountant',
          'Legal Team Lead',
          'Lawyer',
          'Lead Engineer',
        ],
      },
    ])
    .then(answers => {
      // Use user feedback for... whatever!!

      promptChoices();
    })
    .catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

function quit() {}

// Bonus
function updateEmployeeManagers() {}

function viewEmployeesByManager() {}

function viewEmployeesByDepartment() {}

function deleteDepartments() {}
function deletRoles() {}
function deleteEmployees() {}

// View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
function viewTotalUtilizedBudgetOfDepartment() {}
