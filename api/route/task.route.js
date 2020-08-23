const ROUTER = require('express').Router();

const TASK_CONTROLLER = require('../controller/task.controller');
const TAG_ROUTER = require('./tag.route');
const COMMENT_ROUTER = require('./comment.route');
const AUTHORIZE_TASK  = require('../middleware/authorizeTask');

ROUTER.post('/create', TASK_CONTROLLER.createTask)
ROUTER.post('/update', AUTHORIZE_TASK.authorizeUpdate, TASK_CONTROLLER.updateTask)
ROUTER.get('/id/:taskId', AUTHORIZE_TASK.authorizeTaskDetail, TASK_CONTROLLER.getTaskById);
ROUTER.post('/delete', TASK_CONTROLLER.deleteTask);
ROUTER.get('/all/:projectId', TASK_CONTROLLER.getAllTasks);
ROUTER.post('/addAssignee', AUTHORIZE_TASK.authorizeAssignUser, TASK_CONTROLLER.addAssignee);

ROUTER.use('/tag', TAG_ROUTER);
ROUTER.use('/comment', COMMENT_ROUTER);

module.exports = ROUTER;