// Import and require mysql2
const db = require("./db/connnection");
// console.log(db);
// Import and require inquirer
const inquirer = require("inquirer");
const consoleTable = require("console.table");
// ASCII-art Logo
const logo = require("asciiart-logo");
const config = require("./package.json");

console.log(logo(config).render());

function promptChoices() {
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "Add an employee",
          "Update an employee role",
          "View all roles",
          "Add a role",
          "View all departments",
          "Add a Department",
          "Update employee managers",
          "Quit",
        ],
      },
    ])
    .then((answers) => {
      // console.log(answers);
      // Use user feedback for... whatever!!
      switch (answers.choice) {
        case "View all employees":
          viewAllEmployees();
          break;

        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "View all roles":
          viewAllRoles();
          break;

        case "Add a role":
          addRole();
          break;

        case "View all departments":
          viewAllDepartments();
          break;

        case "Add a Department":
          AddDepartment();
          break;
        case "Update employee managers":
          updateEmployeeManagers();
          break;
        case "Quit":
          console.log("Have a good day, please!");
          process.exit();
        // break;
        default:
          break;
      }
    })
    .catch((error) => {
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
  db.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    // console.log('Hello');
    console.table(results);
    promptChoices();
  });
}

function viewAllRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    console.table(results);
    promptChoices();
  });
  // promptChoices();
}

function viewAllEmployees() {
  const sql =
    "SELECT employee.id, employee.first_name As First_Name, employee.last_name AS Last_Name, role.title as Title,department.name AS Department_Name, role.salary AS Salary, CONCAT (manager.first_name, ' ', manager.last_name) AS Manager_Name FROM role JOIN employee ON employee.role_id = role.id JOIN employee manager ON employee.manager_id = manager.id JOIN department on department.id = role.department_id";
  db.query(sql, function (err, results) {
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
        type: "input",
        name: "depName",
        message: "What is the name of the department?",
      },
    ])
    .then((answers) => {
      // Use user feedback for... whatever!!
      db.query(
        `INSERT INTO department (name) VALUES (?)`,
        [answers.depName],
        function (err, results) {
          if (err) throw err;
          console.table(results);
          promptChoices();
        },
      );

      // promptChoices();
    })
    .catch((error) => {
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
        type: "input",
        name: "name",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "department",
        message: "Which department does the role belong to?",
        choices: [
          { name: "Engineering", value: 2 },
          { name: "Fanance", value: 3 },
          { name: "Legal", value: 4 },
          { name: "Sales", value: 1 },
          { name: "Service", value: 5 },
        ],
      },
    ])
    .then((answers) => {
      // Use user feedback for... whatever!!

      db.query(
        `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
        [answers.name, answers.salary, answers.department],
        function (err, results) {
          if (err) throw err;
          console.table(results);
          promptChoices();
        },
      );
      // promptChoices();
    })
    .catch((error) => {
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
        type: "input",
        name: "firstName",
        message: "What is the employee’s first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee’s last name??",
      },
      {
        type: "list",
        name: "role",
        message: "What is the employee’s role?",
        choices: [
          { name: "Sales Lead", value: 1 },
          { name: "Salesperson", value: 2 },
          { name: "Lead Engineer", value: 3 },
          { name: "Software Ingineer", value: 4 },
          { name: "Account Manager", value: 4 },
        ],
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the employee's manager?",
        choices: [
          { name: "None", value: null },
          { name: "John Dow", value: 1 },
          { name: "Mike Chan", value: 2 },
          { name: "Ashley Rodiguez", value: 3 },
        ],
      },
    ])
    .then((answers) => {
      // Use user feedback for... whatever!!
      db.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
        [answers.firstName, answers.lastName, answers.role, answers.manager],
        function (err, results) {
          if (err) throw err;
          console.table(results);
          promptChoices();
        },
      );

      // promptChoices();
    })
    .catch((error) => {
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
        type: "list",
        name: "employee",
        message: "Which employee’s role do you want to update?",
        choices: [
          { name: "John Dow", value: 1 },
          { name: "Mike Chan", value: 2 },
          { name: "Ashley Rodiguez", value: 3 },
        ],
      },
      {
        type: "list",
        name: "role",
        message: "Which role do you want to assign  the selected employee?",
        choices: [
          { name: "Sales Lead", value: 1 },
          { name: "Sales Person", value: 2 },
          { name: "Software Ingineer", value: 3 },
          { name: "Account Manager", value: 4 },
          { name: "Accountant", value: 5 },
          { name: "Legal Team Lead", value: 6 },
          { name: "Lawyer", value: 7 },
          { name: "Lead Engineer", value: 8 },
        ],
      },
    ])
    .then((answers) => {
      console.log(answers.role);
      // Use user feedback for... whatever!!
      // let [firstName, lastName] = answers.employee.split(" ");
      // console.log("first name is:", firstName);
      // console.log("last name is:", lastName);
      db.query(
        `UPDATE employee SET role_id = ? WHERE id = ?`,
        [answers.role, answers.employee],
        function (err, results) {
          if (err) throw err;
          console.table(results);
          promptChoices();
        },
      );
      // promptChoices();
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

// function quit() {
//   console.log('Good Bye!');
//   exit()
// }

// Bonus
function updateEmployeeManagers() {
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: "list",
        name: "employee",
        message: "Which employee’s role do you want to update?",
        choices: [
          { name: "John Dow", value: 1 },
          { name: "Mike Chan", value: 2 },
          { name: "Ashley Rodiguez", value: 3 },
        ],
      },
      {
        type: "list",
        name: "manager",
        message: "Who is your new manager?",
        choices: [
          { name: "John Dow", value: 1 },
          { name: "Mike Chan", value: 2 },
          { name: "Ashley Rodiguez", value: 3 },
        ],
      },
    ])
    .then((answers) => {
      console.log(answers.role);
      // Use user feedback for... whatever!!
      // let [firstName, lastName] = answers.employee.split(" ");
      // console.log("first name is:", firstName);
      // console.log("last name is:", lastName);
      db.query(
        `UPDATE employee SET manager_id = ? WHERE id = ?`,
        [answers.manager, answers.employee],
        function (err, results) {
          if (err) throw err;
          console.table(results);
          promptChoices();
        },
      );
      // promptChoices();
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

function viewEmployeesByManager() {}

function viewEmployeesByDepartment() {}

function deleteDepartments() {}
function deletRoles() {}
function deleteEmployees() {}

// View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
function viewTotalUtilizedBudgetOfDepartment() {}

// the end
