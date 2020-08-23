const ROUTER              = require('express').Router();
const REGISTER_CONTROLLER = require('../controller/register.controller');
const LOGIN_CONTROLLER    = require('../controller/login.controller');
const AUTHORIZE_REGISTER  = require('../middleware/authorizeRegister');

ROUTER.post('/register', AUTHORIZE_REGISTER, REGISTER_CONTROLLER.registerUser);
ROUTER.post('/login', LOGIN_CONTROLLER.loginUser);

module.exports = ROUTER;