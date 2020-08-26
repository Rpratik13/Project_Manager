const COMMENT_SERVICE = require('../service/comment.service');

addComment = (req, res, next) => {
  var today = new Date(); 
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  let taskData = {
    taskId   : req.body.taskId,
    username : req.body.username,
    comment  : req.body.comment,
    date     : `${yyyy}-${mm}-${dd}`
  }


  COMMENT_SERVICE.addComment(taskData)
    .then(response => res.json(response))
    .catch(err => res.json(err));
}

getAllComments = (req, res, next) => {
  COMMENT_SERVICE.getAllComments(req.params.taskId)
    .then(response => res.json(response))
    .catch(err => next(err));
}

deleteComment = (req, res, next) => {
  COMMENT_SERVICE.deleteComment(req.body.commentId)
    .then(response => res.json(response))
    .catch(err => next(err))
}

module.exports = {
  addComment,
  deleteComment,
  getAllComments
}