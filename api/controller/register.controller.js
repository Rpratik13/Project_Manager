const USER_SERVICE = require('../service/user.service');

exports.registerUser = (req, res, next) => {
  let userData = {
    fname               : req.body.fname,
    lname               : req.body.lname,
    username            : req.body.username,
    password            : req.body.password,
    role                : req.body.role,
    password_is_default : true
  };
  
  USER_SERVICE.addUser(userData, next)
    .then(res => res.json(res))
    .catch(err => res.json(err));
}
