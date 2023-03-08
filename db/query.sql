USE employee_db;

SELECT CONCAT(m.first_name, ' ', m.last_name) AS 'Manager_Name', employee.first_name AS 'E_First_Name', employee.last_name AS 'E_Last_Name', employee.role_id 
FROM employee 
left JOIN employee m ON employee.manager_id = m.id  
ORDER BY employee.manager_id;

-- View employees by department.
USE employee_db;
SELECT employee.first_name, employee.last_name, department.name AS 'Department_Name'
FROM employee
LEFT JOIN department ON employee.id = department.id
ORDER BY department.name, employee.last_name;

-- Delete departments, roles, and employees.
USE employee_db;
DELETE FROM department
WHERE id = ;

USE employee_db;
DELETE FROM role
WHERE id = ;

DELETE FROM employee
WHERE id = ;


-- View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
USE employee_db;
SELECT department, SUM(total_enrolled) AS sum_enrolled
FROM employee
GROUP BY department;


