const USER_SERVICE = require('../service/user.service');

getUserByRole = (req, res, next) => {
  USER_SERVICE.getUserByRole(req.params.role)
    .then(user => res.json(user))
    .catch(err => res.json(err));
}

getUserByUsername = (req, res, next) => {
  console.log(req.params.username);
  USER_SERVICE.getUserByUsername(req.params.username)
    .then(user => res.json(user))
    .catch(err => next(err));
}

getAllUsers = (req, res, next) => {
  USER_SERVICE.getAllUsers()
    .then(user => res.json(user))
    .catch(err => res.json(err));
}

deleteUser = (req, res, next) => {
  USER_SERVICE.deleteUser(username)
    .then(user => res.json(user))
    .catch(err => res.json(err));
}

updateUser = (req, res, next) => {
  let newUserData = {
    fname       : req.body.fname,
    lname       : req.body.lname,
    username    : req.body.username,
    password    : req.body.password,
    role        : req.body.role,
    oldUsername : req.body.oldUsername
  }

  USER_SERVICE.updateUser(newUserData)
    .then(user => res.json(user))
    .catch(err => next(err));
}

module.exports = {
  getUserByRole,
  getUserByUsername,
  getAllUsers,
  getUserByUsername,
  deleteUser,
  updateUser
}