const TAG_MODEL = require('../model/tag.model');

const TAG = new TAG_MODEL();

function tagUser(taskData) {
  return new Promise((resolve, reject) => {
    TAG.tagUser(taskData)
        .then(res => resolve(res))
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

module.exports = {
  tagUser,
  removeTag,
  getAllTags,
}