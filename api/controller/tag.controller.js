const TAG_SERVICE = require('../service/tag.service');

tagUser = (req, res, next) => {
  let taskData = {
    taskId   : req.body.taskId,
    username : req.body.username,
    projectId : req.body.projectId
  }

  TAG_SERVICE.tagUser(taskData)
    .then(response => res.json(response))
    .catch(err => next(err));
}

removeTag = (req, res, next) => {
  let taskData = {
    taskId   : req.body.taskId,
    username : req.body.username
  }

  TAG_SERVICE.removeTag(taskData)
    .then(response => res.json(response))
    .catch(err => res.json(err));
}

getAllTags = (req, res, next) => {
  TAG_SERVICE.getAllTags(req.params.taskId)
    .then(response => res.json(response))
    .catch(err => next(err));
}

module.exports = {
  tagUser,
  removeTag,
  getAllTags
}