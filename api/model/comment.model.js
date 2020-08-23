const DB = require('./connectDB');
const DB_ERRORS = require('./dbErrors');

class Comment {
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

  addComment = (taskData) => {
    let sqlQuery = `INSERT INTO final_project.task_comment VALUES('${taskData.taskId}', '${taskData.username}', '${taskData.comment}', '${taskData.date}')`;
    console.log(sqlQuery)
    return this.executeQuery(sqlQuery);
  }

  getAllComments = (taskId) => {
    let sqlQuery = `SELECT * FROM final_project.task_comment WHERE task_id = '${taskId}'`;
    return this.executeQuery(sqlQuery);
  }
}

module.exports = Comment;