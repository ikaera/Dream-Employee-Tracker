
"SELECT employee.manager_id, employee.id, employee.first_name, employee.last_name, employee.role_id
FROM employee 
GROUP BY employee.manager_id"