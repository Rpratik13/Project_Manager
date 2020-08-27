const TAG_MODEL = require('../model/tag.model');
const PROJECT_MODEL = require('../model/project.model');

const TAG = new TAG_MODEL();
const PROJECT = new PROJECT_MODEL();

function tagUser(taskData) {
  return new Promise((resolve, reject) => {
    PROJECT.getUser(taskData.projectId, taskData.username)
      .then(res => {
        if (res.length) {
          TAG.getTaggedUser(taskData.taskId, taskData.username)
            .then(res => {
              if (res.length) {
                reject({msg : 'User already tagged', status : 400})
              }
              else {
                TAG.tagUser(taskData)
                    .then(res => resolve({msg : 'User Tagged', status : 200}))
                    .catch(err => reject(err));
              }
            })
            .catch(err => reject(err));
        } else {
          reject({msg : 'User Not Found', status : 400})
        }
      })
      .catch(err => reject(err));
  });
}

function removeTag(taskData) {
  return new Promise((resolve, reject) => {
    TAG.removeTag(taskData)
        .then(res => resolve(res))
        .catch(err => reject(err));
  });
}

function getAllTags(taskId) {
  return new Promise((resolve, reject) => {
    TAG.getAllTags(taskId)
        .then(res => resolve(res))
        .catch(err => reject(err));
  });
}

function getTaggedTasks(username) {
  return new Promise((resolve, reject) => {
    TAG.getTaggedTasks(username)
        .then(res => resolve(res))
        .catch(err => reject(err));
  });
}

module.exports = {
  tagUser,
  removeTag,
  getAllTags,
  getTaggedTasks
}