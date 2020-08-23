const TASK_SERVICE = require('../service/task.service');

authorizeUpdate = (req, res, next) => {
  let user = req.body.userData;
  TASK_SERVICE.getTaskById(req.body.taskId)
    .then(response => {
      if (user.role !== 'engineer' ||
          (user.role === 'engineer' && response.length && response[0].assignee == user.username)
         ) {
           if (user.role === 'engineer') {
             console.log(req.body);
             res.body.taskId = response[0].task_id;
             res.body.projectId = response[0].project_id;
             res.body.assignee  = response[0].assignee;
           }
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

authorizeTaskDetail = (req, res, next) => {
  let user = req.body.userData;
  if (user.role === 'engineer') {
    next({
      msg    : 'Not authorized',
      status : 400
    })
  }
  else {
    next();
  }
}

module.exports = {
  authorizeUpdate,
  authorizeAssignUser,
  authorizeTaskDetail
}