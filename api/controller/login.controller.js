const LOGIN_SERVICE = require('../service/user.service');

exports.loginUser = (req, res, next) => {
  let loginData = {
    username : req.body.username,
    password : req.body.password,
  };
  LOGIN_SERVICE.loginUser(loginData, next)
    .then(response => res.json(response))
    .catch(err => res.json(err));
}
