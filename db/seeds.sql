-- USE employee_db;
INSERT INTO department (id, name)       
VALUES (1, 'Sales'),
        (2, 'Engineering'),
       (4, 'Legal'),
       (3, 'Fanance'),       
       (5, 'Service');

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Lead", 100000, 1),
       (2, "Salesperson", 80000, 1),
       (3, "Lead Engineer", 150000, 2),
       (4, "Software Enginner", 120000, 2),
       (5, "Account Manager", 160000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", 'Doe', 1, 1),
       (2, "Mike", "Chan", 2, 1),
       (3, 'Ashley', 'Rodrigues', 3, 1),
       (4, "Kevin", "Tupik", 4, 1),
       (5, "Kunal",  "Singh", 5, 1);
       




