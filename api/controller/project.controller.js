const PROJECT_SERVICE = require('../service/project.service');

createProject = (req, res, next) => {
  req.checkBody('projectId')
    .notEmpty().withMessage('Project Name is required');
  req.checkBody('desc')
    .notEmpty().withMessage('Project Description is required');
  req.checkBody('managerId')
    .notEmpty().withMessage('Project Manager is required');
  
    let errors = req.validationErrors();
  if (errors) {
    res.send({ ...errors[0], status : 400});
  }
  else {
    let projectData = {
      id      : req.body.projectId,
      desc    : req.body.desc,
      manager : req.body.managerId
    };



    PROJECT_SERVICE.addProject(projectData)
      .then(response => res.json(response))
      .catch(err => res.json(err));
  }
}

updateProject = (req, res, next) => {
  let newProjectData = {
    id      : req.body.projectId,
    desc    : req.body.desc,
    manager : req.body.managerId,
    oldId   : req.body.oldId,
    oldManager : req.body.oldManager,
  };
  
  req.checkBody('projectId')
    .notEmpty().withMessage('Project Name is required');
  req.checkBody('desc')
    .notEmpty().withMessage('Project Description is required');
  req.checkBody('managerId')
    .notEmpty().withMessage('Project Manager is required');
  
  let errors = req.validationErrors();
  if (errors) {
    res.send({ ...errors[0], status : 400});
  }
  else {
    PROJECT_SERVICE.updateProject(newProjectData)
      .then(response => res.json(response))
      .catch(err => res.json(err)); 
    }
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

removeUser = (req, res, next) => {
  let projectData = {
    project_id : req.body.projectId,
    username   : req.body.username
  }
  PROJECT_SERVICE.removeUser(projectData)
    .then(response => res.json(response))
    .catch(err => res.json(err));
}

getUserProjects = (req, res, next) => {
  let user = req.body.userData;
  PROJECT_SERVICE.getUserProjects(user.username, user.role)
    .then(response => res.json(response))
    .catch(err => next(err));
}

getProjectById = (req, res, next) => {
  let projectId = req.params.projectId;
  PROJECT_SERVICE.getProjectById(projectId)
    .then(response => res.json(response))
    .catch(err => next(err));
}

getUser = (req, res, next) => {
  let projectId = req.params.projectId;
  PROJECT_SERVICE.getUser(projectId)
    .then(response => res.json(response))
    .catch(err => next(err))
}

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  addUser,
  removeUser,
  getUserProjects,
  getProjectById,
  getUser
}