const COMMENT_MODEL = require('../model/comment.model');

const COMMENT = new COMMENT_MODEL();

function addComment(taskData) {
  return new Promise((resolve, reject) => {
    COMMENT.addComment(taskData)
        .then(res => resolve(res))
        .catch(err => reject(err));
  });
}

function getAllComments(taskId) {
  return new Promise((resolve, reject) => {
    COMMENT.getAllComments(taskId)
        .then(res => resolve(res))
        .catch(err => reject(err));
  });
}

module.exports = {
  addComment,
  getAllComments
}