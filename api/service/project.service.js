const PROJECT_MODEL = require('../model/project.model');

const PROJECT = new PROJECT_MODEL();

function addProject(projectData) {
  return new Promise((resolve, reject) => {
    PROJECT.getProjectById(projectData.id)
      .then(res => {
        if (res.length) {
          reject({
            msg : 'Project name already taken',
            status : 400,
          })
        }
        else {
          PROJECT.addProject(projectData)
          .then(res => resolve({msg : 'Project Created', status : 200}))
          .catch(err => reject(err));
        }
      })
  
  });
}

function updateProject(newProjectData) {
  return new Promise((resolve, reject) => {
    PROJECT.updateProject(newProjectData)
        .then(res => resolve(res))
        .catch(err => reject(err));
  });
}

function deleteProject(projectId) {
  return new Promise((resolve, reject) => {
    PROJECT.deleteProject(projectId)
        .then(res => resolve(res))
        .catch(err => reject(err));
  });
}

function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    PROJECT.getProjectById(projectId)
        .then(res => resolve(res))
        .catch(err => reject(err));
  });
}

function getAllProjects() {
  return new Promise((resolve, reject) => {
    PROJECT.getAllProjects()
        .then(res => resolve(res))
        .catch(err => reject(err));
  });
}

function addUser(projectData) {
  return new Promise((resolve, reject) => {
    PROJECT.addUser(projectData)
        .then(res => resolve(res))
        .catch(err => reject(err));
  });
}

function getUserProjects(username, role) {
  if (role === 'project manager') {
    return new Promise((resolve, reject) => {
      PROJECT.getProjectManagerProjects(username)
          .then(res => resolve(res))
          .catch(err => reject(err));
    }); 
  } else {
    return new Promise((resolve, reject) => {
      PROJECT.getUserProjects(username)
          .then(res => resolve(res))
          .catch(err => reject(err));
    }); 
  }
  
}

module.exports = {
  addProject,
  updateProject,
  deleteProject,
  getAllProjects,
  addUser,
  getUserProjects,
  getProjectById
}