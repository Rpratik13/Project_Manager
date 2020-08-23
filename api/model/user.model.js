const DB = require('./connectDB');
const DB_ERRORS = require('./dbErrors');

class User {
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
          reject(err);
        });
    });
  }

  /**
   * Adds user to database.
   * 
   * @param {Object} userData Holds user data to insert to database. 
   */
  addUser = (userData) => {
    let userDataValues = Object.values(userData);
    userDataValues.forEach((data, index) => userDataValues[index] = `'${userDataValues[index]}'`);

    let sqlQuery = `INSERT INTO final_project.user VALUES (${userDataValues.join(',')})`;
    return this.executeQuery(sqlQuery);
  }

  /**
   * Extracts users based on role from database.
   * 
   * @param {string} role Role of users to be extracted. 
   */
  getUserByRole = (role) => {
    let sqlQuery = `SELECT * FROM final_project.user WHERE role = '${role}'`;
    return this.executeQuery(sqlQuery);
  }

  getUserByUsername = (username) => {
    let sqlQuery = `SELECT * FROM final_project.user WHERE username = '${username}'`;
    return this.executeQuery(sqlQuery);
  }

  getAllUsers = () => {
    let sqlQuery = 'SELECT * FROM final_project.user';
    return this.executeQuery(sqlQuery);
  }

  deleteUser = (username) => {
    let sqlQuery = `DELETE FROM final_project.user WHERE username = '${username}'`;
    return this.executeQuery(sqlQuery);
  }

  loginUser = (loginData) => {
    let sqlQuery = `SELECT * FROM final_project.user WHERE username = '${loginData.username}'`;
    return this.executeQuery(sqlQuery);
  }

  updateUser = (newUserData) => {
    console.log(newUserData);
    let sqlQuery = `UPDATE final_project.user SET fname = '${newUserData.fname}', lname = '${newUserData.lname}', username = '${newUserData.username}', password = '${newUserData.password}', role = '${newUserData.role}' WHERE username = '${newUserData.oldUsername}'`;
    console.log(sqlQuery);
    return this.executeQuery(sqlQuery);
  }
}

module.exports = User;