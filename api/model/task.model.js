const DB = require('./connectDB');
const DB_ERRORS = require('./dbErrors');

class Task {
  /**
   * Executes SQL query.
   * 
   * @param {string} query Holds SQL query. 
   */
  executeQuery = (query) => {
    return new Promise((resolve, reject) => {
      DB.query(query)
        .then((res) => {
          resolve(res.rows);
        })
        .catch((err) => {
          reject(DB_ERRORS[err.code]);
        });
    });
  }

  /**
   * Adds new task to database.
   * 
   * @param {Object} taskData Holds task data to insert to database. 
   */
  addTask = (taskData) => {
    let taskDataValues = Object.values(taskData);
    taskDataValues.forEach((data, index) => taskDataValues[index] = `'${taskDataValues[index]}'`);
    let sqlQuery = `INSERT INTO final_project.project_task VALUES (${taskDataValues.join(',')})`;
    return this.executeQuery(sqlQuery);
  }

  updateTask = (newTaskData) => {
    let sqlQuery = `UPDATE final_project.project_task SET project_id = '${newTaskData.projectId}', task_name = '${newTaskData.taskName}', task_desc = '${newTaskData.desc}', deadline = '${newTaskData.deadline}', assignee = '${newTaskData.assignee}' WHERE task_id = '${newTaskData.taskId}'`;
    console.log(sqlQuery);
    return this.executeQuery(sqlQuery);
  }

  getTaskById = (taskId) => {
    let sqlQuery = `SELECT * FROM final_project.project_task WHERE task_id = '${taskId}'`;
    return this.executeQuery(sqlQuery);
  }

  deleteTask = (taskId) => {
    let sqlQuery = `DELETE FROM final_project.project_task WHERE task_id = '${taskId}'`;
    return this.executeQuery(sqlQuery);
  }

  getAllTasks = (projectId) => {
    let sqlQuery = `SELECT * FROM final_project.project_task WHERE project_id = '${projectId}'`;
    return this.executeQuery(sqlQuery);
  }

  getProjectTask = (projectId, taskId) => {
    let sqlQuery = `SELECT * FROM final_project.project_task WHERE project_id = '${projectId}' AND task_name = '${taskId}'`;
    return this.executeQuery(sqlQuery);
  }

  addAssignee = (taskData) => {
    let sqlQuery = `UPDATE final_project.project_task SET assignee = '${taskData.assignee}' WHERE task_id = '${taskData.taskId}'`
    return this.executeQuery(sqlQuery);
  }
}

module.exports = Task;