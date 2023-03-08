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
          "View Employees",
          "View Roles",
          "View Departments",
          "Add Employee",
          "Add Role",
          "Add Department",
          "Update an employee role",
          "Update employee managers",
          "View employees by manager",
          "View employees by department",
          // "Delete Departments",
          // "View total utilized budget of a department",

          "Quit",
        ],
      },
    ])
    .then((answers) => {
      // console.log(answers);
      // Use user feedback for... whatever!!
      switch (answers.choice) {
        case "View Employees":
          viewAllEmployees();
          break;

        case "View Roles":
          viewAllRoles();
          break;
        case "View Departments":
          viewAllDepartments();
          break;

        case "Add Employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          AddDepartment();
          break;

        case "Update employee managers":
          updateEmployeeManagers();
          break;
        case "View employees by manager":
          viewEmployeesByManager();
          break;
        case "View employees by department":
          viewEmployeesByDepartment();
          break;
        // case "Delete Departments":
        //   deleteDepartments();
        //   break;
        // case "Delete Roles":
        //   deletRoles();
        //   break;
        // case "Delete Employees":
        //   deleteEmployees();
        //   break;
        // case "View total utilized budget of a department":
        //   viewTotalUtilizedBudgetOfDepartment();
        //   break;

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
  db.query("SELECT * FROM department ORDER BY id", function (err, results) {
    if (err) throw err;
    // console.log('Hello');
    console.table(results);
    promptChoices();
  });
}

function viewAllRoles() {
  const sql =
    "SELECT role.id, role.title AS Job_Title, department.name AS Department_Name, role.salary AS Salary FROM role JOIN department ON role.department_id = department.id";
  db.query(sql, function (err, results) {
    if (err) throw err;
    console.table(results);
    promptChoices();
  });
  // promptChoices();
}

function viewAllEmployees() {
  const sql =
    "SELECT employee.id, employee.first_name As First_Name, employee.last_name AS Last_Name, role.title as Title,department.name AS Department_Name, role.salary AS Salary, CONCAT (manager.first_name, ' ', manager.last_name) AS Manager_Name FROM role CROSS JOIN employee ON employee.role_id = role.id LEFT JOIN employee manager ON employee.manager_id = manager.id LEFT JOIN department on department.id = role.department_id";
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
  db.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    // console.log('Hello');
    // console.log(results);

    const deptChoices = results.map((item) => {
      return { name: item.name, value: item.id };
    });

    // promptChoices();
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
          choices: deptChoices,
          // choices: [
          // { name: "Engineering", value: 2 },
          // { name: "Fanance", value: 3 },
          // { name: "Legal", value: 4 },
          // { name: "Sales", value: 1 },
          // { name: "Service", value: 5 },
          // ],
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
  });
}

function addEmployee() {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    // console.log('Hello');
    // console.log(results);

    const roleChoices = results.map((item) => {
      return { name: item.title, value: item.id };
    });

    db.query("SELECT * FROM employee", function (err, eResults) {
      if (err) throw err;
      // console.log('Hello');
      // console.log(eResults);

      const eChoices = eResults.map((item) => {
        return { name: item.first_name + " " + item.last_name, value: item.id };
      });
      eChoices.push({ name: "No Manager", value: null });
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
            message: "What is the employee’s last name?",
          },
          {
            type: "list",
            name: "role",
            message: "What is the employee’s role?",
            choices: roleChoices,
            // choices: [
            // { name: "Sales Lead", value: 1 },
            // { name: "Salesperson", value: 2 },
            // { name: "Lead Engineer", value: 3 },
            // { name: "Software Ingineer", value: 4 },
            // { name: "Account Manager", value: 4 },
            // ],
          },
          {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: eChoices,
            // [
            //   { name: "None", value: null },
            //   { name: "John Dow", value: 1 },
            //   { name: "Mike Chan", value: 2 },
            //   { name: "Ashley Rodiguez", value: 3 },
            // ],
          },
        ])
        .then((answers) => {
          // Use user feedback for... whatever!!
          db.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
            [
              answers.firstName,
              answers.lastName,
              answers.role,
              answers.manager,
            ],
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
    });
  });
}

function updateEmployeeRole() {
  db.query("SELECT * FROM employee", (err, eResults) => {
    if (err) throw err;
    // console.log(eResults);
    const employeeChoices = eResults.map((item) => {
      return { name: item.first_name + " " + item.last_name, value: item.id };
    });
    // console.log(employeeChoices);

    db.query("SELECT * FROM role", (err, roleResults) => {
      if (err) throw err;

      const roleChoices = roleResults.map((item) => {
        return { name: item.title, value: item.id };
      });

      inquirer
        .prompt([
          /* Pass your questions in here */
          {
            type: "list",
            name: "employee",
            message: "Which employee’s role do you want to update?",
            choices: employeeChoices,
            // [
            //   { name: "John Dow", value: 1 },
            //   { name: "Mike Chan", value: 2 },
            //   { name: "Ashley Rodiguez", value: 3 },
            // ],
          },
          {
            type: "list",
            name: "role",
            message: "Which role do you want to assign  the selected employee?",
            choices: roleChoices,
            // [
            //   { name: "Sales Lead", value: 1 },
            //   { name: "Sales Person", value: 2 },
            //   { name: "Software Ingineer", value: 3 },
            //   { name: "Account Manager", value: 4 },
            //   { name: "Accountant", value: 5 },
            //   { name: "Legal Team Lead", value: 6 },
            //   { name: "Lawyer", value: 7 },
            //   { name: "Lead Engineer", value: 8 },
            // ],
          },
        ])
        .then((answers) => {
          // console.log(answers.role);
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
    });
  });
}

// Bonus
function updateEmployeeManagers() {
  db.query("SELECT * FROM employee", function (err, eResults) {
    if (err) throw err;
    // console.log('Hello');
    // console.log(eResults);

    const eChoices = eResults.map((item) => {
      return { name: item.first_name + " " + item.last_name, value: item.id };
    });
    inquirer
      .prompt([
        /* Pass your questions in here */
        {
          type: "list",
          name: "employee",
          message: "Which employee’s role do you want to update?",
          choices: eChoices,
          // [
          //   { name: "John Dow", value: 1 },
          //   { name: "Mike Chan", value: 2 },
          //   { name: "Ashley Rodiguez", value: 3 },
          // ],
        },
        {
          type: "list",
          name: "manager",
          message: "Who is his/her new manager?",
          choices: eChoices,
          // [
          //   { name: "John Dow", value: 1 },
          //   { name: "Mike Chan", value: 2 },
          //   { name: "Ashley Rodiguez", value: 3 },
          // ],
        },
      ])
      .then((answers) => {
        console.log(answers.role);
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
  });
}

function viewEmployeesByManager() {
  const sql = `SELECT CONCAT(m.first_name, ' ', m.last_name) AS 'Manager_Name', employee.first_name AS 'E_First_Name', employee.last_name AS 'E_Last_Name' FROM employee left JOIN employee m ON employee.manager_id = m.id  ORDER BY employee.manager_id; `;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.table(result);
    promptChoices();
  });
}

function viewEmployeesByDepartment() {
  const sql =
    "SELECT employee.first_name, employee.last_name, department.name AS 'Department_Name' FROM employee LEFT JOIN department ON employee.id = department.id ORDER BY department.name, employee.first_name;";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.table(result);
    promptChoices();
  });
}

function deleteDepartments() {}
function deletRoles() {}
function deleteEmployees() {}

// View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
function viewTotalUtilizedBudgetOfDepartment() {}

// the end
