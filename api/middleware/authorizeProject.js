const PROJECT_SERVICE = require('../service/project.service');

function authorizeAdmin(req, res, next) {
  let user = req.body.userData;
  if (user.role !== 'admin') {
    next({
      msg    : 'Not authorized',
      status : 400
    });
  } 
  else {
    next();
  }
};

function authorizeUpdate(req, res, next) {
  let user = req.body.userData;
  if (user.role === 'admin') {
    next()
  } 
  else if (user.role === 'project manager') {
    TASK_SERVICE.getProjectById(req.body.projectId)
      .then(response => {
        if (response.length && response[0].manager_id === user.username) {
          next();
        }
      })
      .catch(err => next(err));
  }
  else {
    next({
      msg    : 'Not authorized',
      status : 400
    });
  }
}

authorizeAddUser = (req, res, next) => {
  let user = req.body.userData;

  if (user.role === 'admin') {
    next()
  }
  else if (user.role === 'project manager') {
    TASK_SERVICE.getProjectById(req.body.projectId)
      .then(response => {
        if (response.length && response[0].manager_id === user.username) {
          next();
        }
      })
      .catch(err => next(err));
  }
  else {
    next({
      msg    : 'Not authorized',
      status : 400
    })
  }

}

authorizeViewAll = (req, res, next) => {
  let user = req.body.userData;

  if (user.role === 'admin' || user.role === 'project manager') {
    next();
  }
  else {
    console.log(req.params);
  }
}

module.exports = {
  authorizeAdmin,
  authorizeUpdate,
  authorizeAddUser,
  authorizeViewAll,
}