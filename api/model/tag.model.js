const DB = require('./connectDB');
const DB_ERRORS = require('./dbErrors');

class Tag {
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

  tagUser = (taskData) => {
    let sqlQuery = `INSERT INTO final_project.task_tag VALUES('${taskData.taskId}', '${taskData.username}')`;
    return this.executeQuery(sqlQuery);
  }

  removeTag = (taskData) => {
    let sqlQuery = `DELETE FROM final_project.task_tag WHERE task_id = '${taskData.taskId}' AND username = '${taskData.username}'`;
    return this.executeQuery(sqlQuery);
  }

  getAllTags = (taskId) => {
    let sqlQuery = `SELECT * FROM final_project.task_tag WHERE task_id = '${taskId}'`;
    return this.executeQuery(sqlQuery);
  }

  
  getTaggedUser = (taskId, username) => {
    let sqlQuery = `SELECT * from final_project.task_tag WHERE task_id = '${taskId}' AND username = '${username}'`;
    return this.executeQuery(sqlQuery);
  }
}

module.exports = Tag;