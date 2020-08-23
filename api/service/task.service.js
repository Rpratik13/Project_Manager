const TASK_MODEL = require('../model/task.model');

const TASK = new TASK_MODEL();

function addTask(taskData) {
  return new Promise((resolve, reject) => {
    TASK.addTask(taskData)
        .then(res => resolve(res))
        .catch(err => reject(err));
  });
}

function updateTask(newTaskData) {
  return new Promise((resolve, reject) => {
    TASK.updateTask(newTaskData)
        .then(res => resolve(res))
        .catch(err => reject(err));
  });
}

function getTaskById(taskId) {
  return new Promise((resolve, reject) => {
    TASK.getTaskById(taskId)
        .then(res => resolve(res))
        .catch(err => reject(err));
  });
}

function deleteTask(taskId) {
  return new Promise((resolve, reject) => {
    TASK.deleteTask(taskId)
        .then(res => resolve(res))
        .catch(err => reject(err));
  });
}

function addAssignee(taskData) {
  return new Promise((resolve, reject) => {
    TASK.deleteTask(taskId)
        .then(res => resolve(res))
        .catch(err => reject(err));
  });
}

function getAllTasks(projectId) {
  return new Promise((resolve, reject) => {
    TASK.getAllTasks(projectId)
        .then(res => resolve(res))
        .catch(err => reject(err));
  });
}

module.exports = {
  addTask,
  updateTask,
  getTaskById,
  deleteTask,
  getAllTasks,
  addAssignee
}