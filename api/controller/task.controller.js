const TASK_SERVICE = require('../service/task.service');

createTask = (req, res, next) => {
  let taskData = {
    project_id : req.body.projectId,
    task_id    : req.body.taskId,
    desc       : req.body.desc,
    deadline   : req.body.deadline,
    assignee   : req.body.assignee || null,
  };
  TASK_SERVICE.addTask(taskData)
    .then(response => res.json(response))
    .catch(err => res.json(err));
}

updateTask = (req, res, next) => {
  let newTaskData = {
    projectId  : req.body.projectId,
    taskId     : req.body.taskId,
    desc       : req.body.desc,
    deadline   : req.body.deadline,
    assignee   : req.body.assignee || null, 
    oldId      : req.body.oldId
  };

  TASK_SERVICE.updateTask(newTaskData)
    .then(response => res.json(response))
    .catch(err => res.json(err));
}

getTaskById = (req, res, next) => {
  TASK_SERVICE.getTaskById(req.params.taskId)
    .then(response => res.json(response))
    .catch(err => res.json(err));
}

deleteTask = (req, res, next) => {
  let taskId = req.body.taskId;
  TASK_SERVICE.deleteTask(taskId)
    .then(response => res.json(response))
    .catch(err => res.json(err));
}

getAllTasks = (req, res, next) => {
  TASK_SERVICE.getAllTasks(req.params.projectId)
    .then(response => res.json(response))
    .catch(err => res.json(err));
}

addAssignee = (req, res, next) => {
  let taskData = {
    assignee : req.body.assignee,
    taskId   : req.body.taskId
  }

  TASK_SERVICE.addAssignee(taskData)
    .then(response => res.json(response))
    .catch(err => res.json(err));
}

module.exports = {
  createTask,
  updateTask,
  getTaskById,
  deleteTask,
  getAllTasks,
  addAssignee,
}