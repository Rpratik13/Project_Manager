const ROUTER = require('express').Router();
const COMMENT_CONTROLLER = require('../controller/comment.controller');


const AUTHORIZE_COMMENT  = require('../middleware/authorizeComment');

ROUTER.post('/add', COMMENT_CONTROLLER.addComment);
ROUTER.post('/delete', COMMENT_CONTROLLER.deleteComment);
ROUTER.get('/:taskId', COMMENT_CONTROLLER.getAllComments);

module.exports = ROUTER;