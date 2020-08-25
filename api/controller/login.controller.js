const LOGIN_SERVICE = require('../service/user.service');

exports.loginUser = (req, res, next) => {
  req.checkBody('username')
    .notEmpty().withMessage('Invalid Username or Password');
  req.checkBody('password')
    .notEmpty().withMessage('Invalid Username or Password');
  
  let errors = req.validationErrors();

  if(errors) {
    next({
      msg    : errors[0].msg,
      status : 400
    })
  }

  else {
    let loginData = {
      username : req.body.username,
      password : req.body.password,
    };

    LOGIN_SERVICE.loginUser(loginData, next)
      .then(response => res.json(response))
      .catch(err => next(err));  
    }
  }