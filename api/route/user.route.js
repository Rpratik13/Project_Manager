const ROUTER          = require('express').Router();
const USER_CONTROLLER = require('../controller/user.controller');
const PROJECT_CONTROLLER = require('../controller/project.controller');
const AUTHORIZE_PROJECT = require('../middleware/authorizeProject');

ROUTER.get('/id/:username', AUTHORIZE_PROJECT.authorizeAdmin, USER_CONTROLLER.getUserByUsername);
ROUTER.get('/role/:role', USER_CONTROLLER.getUserByRole);
ROUTER.get('/all', AUTHORIZE_PROJECT.authorizeAdmin, USER_CONTROLLER.getAllUsers);
ROUTER.post('/delete', AUTHORIZE_PROJECT.authorizeAdmin, USER_CONTROLLER.deleteUser);
ROUTER.post('/update', AUTHORIZE_PROJECT.authorizeAdmin, USER_CONTROLLER.updateUser);
ROUTER.get('/projects', PROJECT_CONTROLLER.getUserProjects);
module.exports = ROUTER;