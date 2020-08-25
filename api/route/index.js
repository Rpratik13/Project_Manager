// Import Modules
const ROUTER = require('express').Router();

// Import Routes
const AUTH_ROUTER    = require('./auth.route');
const USER_ROUTER    = require('./user.route');
const PROJECT_ROUTER = require('./project.route');
const TASK_ROUTER = require('./task.route');
const AUTHENTICATE = require('../middleware/authenticate'); 

ROUTER.use('/auth', AUTH_ROUTER);
ROUTER.use('/users', AUTHENTICATE, USER_ROUTER);
ROUTER.use('/project', AUTHENTICATE, PROJECT_ROUTER);
ROUTER.use('/task', AUTHENTICATE, TASK_ROUTER);
module.exports = ROUTER;