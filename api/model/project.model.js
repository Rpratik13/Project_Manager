const DB = require('./connectDB');
const DB_ERRORS = require('./dbErrors');

class Project {
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
   * Adds new project to database.
   * 
   * @param {Object} projectData Holds project data to insert to database. 
   */
  addProject = (projectData) => {
    let projectDataValues = Object.values(projectData);
    projectDataValues.forEach((data, index) => projectDataValues[index] = `'${projectDataValues[index]}'`);

    let sqlQuery = `INSERT INTO final_project.project VALUES (${projectDataValues.join(',')})`;
    return this.executeQuery(sqlQuery);
  }

  updateProject = (newProjectData) => {
    let sqlQuery = `UPDATE final_project.project SET id = '${newProjectData.id}', project_desc = '${newProjectData.desc}', manager_id = '${newProjectData.manager}' WHERE id = '${newProjectData.oldId}'`;
    return this.executeQuery(sqlQuery);
  }

  deleteProject = (projectId) => {
    let sqlQuery = `DELETE FROM final_project.project WHERE id = '${projectId}'`;
    return this.executeQuery(sqlQuery);
  }

  getAllProjects = () => {
    let sqlQuery = `SELECT project_id FROM final_project.project`;
    return this.executeQuery(sqlQuery);
  }

  addUser = (projectData) => {
    let projectDataValues = Object.values(projectData);
    projectDataValues.forEach((data, index) => projectDataValues[index] = `'${projectDataValues[index]}'`);

    let sqlQuery = `INSERT INTO final_project.project_user VALUES (${projectDataValues.join(',')})`;
    return this.executeQuery(sqlQuery);
  }

  getProjectManagerProjects = (username) => {
    let sqlQuery = `SELECT * FROM final_project.project WHERE username = '${username}'`;
    return this.executeQuery(sqlQuery);
  }

  getUserProjects = (username) => {
    let sqlQuery = `SELECT final_project.project.* FROM final_project.project JOIN final_project.project_user ON final_project.project.id = final_project.project_user.project_id WHERE username = '${username}'`;
    console.log(sqlQuery);
    return this.executeQuery(sqlQuery);  
  }
}

module.exports = Project;