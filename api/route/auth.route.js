const ROUTER              = require('express').Router();
const REGISTER_CONTROLLER = require('../controller/register.controller');
const LOGIN_CONTROLLER    = require('../controller/login.controller');
const AUTHORIZE_REGISTER  = require('../middleware/authorizeRegister');
const AUTHENTICATE = require('../middleware/authenticate'); 

ROUTER.post('/register', AUTHENTICATE, AUTHORIZE_REGISTER, REGISTER_CONTROLLER.registerUser);
ROUTER.post('/login', LOGIN_CONTROLLER.loginUser);

module.exports = ROUTER;