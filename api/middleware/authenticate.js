const JWT = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token;
  if (req.headers['authentication']) {
    token = req.headers['authentication'];
  }

  if (req.headers['x-access-token']) {
    token = req.headers['x-access-token'];
  }

  if (req.headers['token']) {
    token = req.headers['token'];
  }

  if (!token) {
    return next({
      msg: 'Token Not Found',
      status : 406
    });
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      next(err);
    }
    else {
      req.body.userData = decoded; 
      next();
    }
  });
};