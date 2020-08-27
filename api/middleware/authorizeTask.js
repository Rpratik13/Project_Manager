const TASK_SERVICE = require('../service/task.service');

authorizeUpdate = (req, res, next) => {
  let user = req.body.userData;
  TASK_SERVICE.getTaskById(req.body.taskId)
    .then(response => {
      if (user.role !== 'engineer' ||
          (user.role === 'engineer' && response.length && response[0].assignee == user.username)
         ) {
           console.log('here');
        next()
      }
      else {
        next({
          msg    : 'Not authorized',
          status : 400
        });
      }
    })
    .catch(err => next(err));
};

authorizeAssignUser = (req, res, next) => {
  let user = req.body.userData;
  if (user.role == 'project manager' || user.role == 'team lead') {
    next();
  }
  else {
    next({
      msg    : 'Not authorized',
      status : 400
    })
  }
}

authorizeCreate = (req, res, next) => {
  let user = req.body.userData;
  if (user.role === 'engineer') {
    next({
      msg : 'Not authorized',
      status : 400
    })
  } else {
    next();
  }
}
module.exports = {
  authorizeUpdate,
  authorizeAssignUser,
  authorizeCreate
}