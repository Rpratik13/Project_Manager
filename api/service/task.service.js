const TASK_MODEL = require('../model/task.model');

const TASK = new TASK_MODEL();

function addTask(taskData) {
  return new Promise((resolve, reject) => {
    TASK.getProjectTask(taskData.project_id, taskData.task_id)
      .then(res => {
        if (res.length) {
        reject({msg : 'Task already exists', status : 400})
        } else {
          TASK.addTask(taskData)
              .then(res => resolve({msg : 'Task Created', status : 200}))
              .catch(err => reject(err));
        }
      })
      .catch(err => reject(err));
  });
}

function updateTask(newTaskData) {
  return new Promise((resolve, reject) => {
    TASK.updateTask(newTaskData)
        .then(res => resolve({msg : 'Task Updated', status : 200}))
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