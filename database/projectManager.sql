CREATE SCHEMA final_project;

CREATE TABLE final_project.user (
  fname               VARCHAR(30),
  lname               VARCHAR(30),
  username            VARCHAR(30),
  password            VARCHAR(200),
  role                VARCHAR(25),
  password_is_default BOOLEAN,

  PRIMARY KEY (username)
);

INSERT INTO final_project.user VALUES('admin', 'admin', 'admin', '$2b$10$TzNqWD.7mYB993/KGEIl9ueS73pVpBTAhNsHtU.djrNIb4flprt0a', 'admin', true);

CREATE TABLE final_project.project (
  id           VARCHAR(100),
  project_desc VARCHAR(200),
  manager_id   VARCHAR(30),
  
  PRIMARY KEY (id),
  
  FOREIGN KEY (manager_id)
    REFERENCES final_project.user(username)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE final_project.project_user (
  project_id VARCHAR(100),
  username   VARCHAR(30),
  
  FOREIGN KEY (project_id)
    REFERENCES final_project.project(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
  FOREIGN KEY (username)
    REFERENCES final_project.user(username)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE final_project.project_task (
  project_id VARCHAR(100),
  task_name    VARCHAR(100),
  task_desc  VARCHAR(200),
  deadline   DATE,
  assignee   VARCHAR(30),
  task_id SERIAL,

  PRIMARY KEY (task_id),
  
  FOREIGN KEY (project_id)
    REFERENCES final_project.project(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE final_project.task_tag (
  task_id  INT,
  username VARCHAR(30),
  
  FOREIGN KEY (task_id)
    REFERENCES final_project.project_task(task_id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
  FOREIGN KEY (username)
    REFERENCES final_project.user(username)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE final_project.task_comment (
  task_id      INT,
  username     VARCHAR(30),
  comment_text VARCHAR,
  date         DATE,
  completed    BOOLEAN,
  comment_id   SERIAL,
  
  FOREIGN KEY (task_id)
    REFERENCES final_project.project_task(task_id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
  FOREIGN KEY (username)
    REFERENCES final_project.user(username)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);