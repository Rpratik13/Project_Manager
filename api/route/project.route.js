const ROUTER = require('express').Router();

const PROJECT_CONTROLLER = require('../controller/project.controller');
const AUTHORIZE_PROJECT  = require('../middleware/authorizeProject');

ROUTER.post('/create', AUTHORIZE_PROJECT.authorizeAdmin, PROJECT_CONTROLLER.createProject)
ROUTER.post('/update', AUTHORIZE_PROJECT.authorizeUpdate, PROJECT_CONTROLLER.updateProject)
ROUTER.post('/delete', AUTHORIZE_PROJECT.authorizeAdmin, PROJECT_CONTROLLER.deleteProject);
ROUTER.get('/all', AUTHORIZE_PROJECT.authorizeViewAll, PROJECT_CONTROLLER.getAllProjects);
ROUTER.get('/id/:projectId', PROJECT_CONTROLLER.getProjectById);
ROUTER.post('/adduser', AUTHORIZE_PROJECT.authorizeAddUser, PROJECT_CONTROLLER.addUser)

module.exports = ROUTER;