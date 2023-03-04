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

// view functions
function viewAllDepartments() {}

function viewAllRoles() {}

function viewAllEmployees() {}

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
