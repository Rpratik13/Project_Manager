// Import Modules
require('dotenv').config();
const APP = require('express')();

// Import Files
const CONFIG      = require('./config');
const ROUTES      = require('./route')
const BODY_PARSER = require('body-parser');

APP.use(BODY_PARSER.json())

APP.use('/api', ROUTES);

// Error handler for undefined paths
APP.use((req, res, next) => {
  res.send({
    msg: 'Page Not Found',
    status: 404
  });
});

// Middleware for handling Errors
APP.use((err, req, res, next) => {
  res.json({
    msg    : err.msg || err,
    status : err.status || 400
  });
});

APP.listen(CONFIG.port, () => {
  console.log('Server listening at port ', CONFIG.port);
});