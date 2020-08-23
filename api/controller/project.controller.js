const PROJECT_SERVICE = require('../service/project.service');

createProject = (req, res, next) => {
  let projectData = {
    id      : req.body.projectId,
    desc    : req.body.desc,
    manager : req.body.managerId
  };

  PROJECT_SERVICE.addProject(projectData)
    .then(response => res.json(response))
    .catch(err => res.json(err));
}

updateProject = (req, res, next) => {
  let newProjectData = {
    id      : req.body.projectId,
    desc    : req.body.desc,
    manager : req.body.managerId,
    oldId   : req.body.oldId
  };

  PROJECT_SERVICE.updateProject(newProjectData)
    .then(response => res.json(response))
    .catch(err => res.json(err));
}

deleteProject = (req, res, next) => {
  let projectId = req.body.projectId;
  PROJECT_SERVICE.deleteProject(projectId)
    .then(response => res.json(response))
    .catch(err => res.json(err));
}

getAllProjects = (req, res, next) => {
  PROJECT_SERVICE.getAllProjects()
    .then(response => res.json(response))
    .catch(err => res.json(err));
}

addUser = (req, res, next) => {
  let projectData = {
    project_id : req.body.projectId,
    username   : req.body.username
  }

  PROJECT_SERVICE.addUser(projectData)
    .then(response => res.json(response))
    .catch(err => res.json(err));
}

getUserProjects = (req, res, next) => {
  let user = req.body.userData;
  PROJECT_SERVICE.getUserProjects(user.username, user.role)
    .then(response => res.json(response))
    .catch(err => next(err));
}

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  addUser,
  getUserProjects
}