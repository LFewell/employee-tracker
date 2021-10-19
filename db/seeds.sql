INSERT INTO department (name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  
    ("Title", 80000, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
    ("Lincoln", "Fewell", 1);