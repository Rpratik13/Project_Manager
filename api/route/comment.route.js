const ROUTER = require('express').Router();
const COMMENT_CONTROLLER = require('../controller/comment.controller');


const AUTHORIZE_COMMENT  = require('../middleware/authorizeComment');

ROUTER.post('/add', AUTHORIZE_COMMENT, COMMENT_CONTROLLER.addComment);
ROUTER.get('/:taskId', COMMENT_CONTROLLER.getAllComments);

module.exports = ROUTER;