USE employee_db;

SELECT employee.manager_id, employee.first_name, employee.last_name
FROM employee 
GROUP BY employee.manager_id