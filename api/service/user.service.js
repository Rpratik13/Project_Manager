const USER_MODEL = require('../model/user.model');
const B_CRYPT = require('bcrypt');
const TOKEN   = require('../util/jwtToken');
const CONFIG = require('../config');

const USER = new USER_MODEL();

function addUser(userData, next) {
  return new Promise((resolve, reject) => {
    B_CRYPT.genSalt(CONFIG.saltRounds, function(err, salt) {
      B_CRYPT.hash(userData.password, salt, function (err, hash) {
        if (err) {
          next(err);
        }
        else {
          userData = {...userData, password : hash}
          USER.addUser(userData)
              .then(res => resolve(res))
              .catch(err => reject(err));
        }
      });
    });
  });
}

function getUserByRole(role) {
  return new Promise((resolve, reject) => {
    USER.getUserByRole(role)
        .then(res => resolve(res))
        .catch(err => reject(err));
  });
}

function getUserByUsername(username) {
  return new Promise((resolve, reject) => {
    USER.getUserByUsername(username)
        .then(res => resolve(res[0]))
        .catch(err => reject(err));
  });
}

function loginUser(loginData) {
  return new Promise((resolve, reject) => {
    USER.loginUser(loginData)
      .then(res => {
        B_CRYPT.compare(loginData.password, res[0].password, function(err, compareResult) {
          if (err) {
            reject(err);
          } 
          else if (compareResult) {
            token = TOKEN.createToken(res[0]);
            result = JSON.parse(JSON.stringify(res[0]));
            let data = {
              ...result,
              token,
              status : 200
            };
            resolve(data);
          }
        });
      })
      .catch(err => reject(err));
      });
}

function getAllUsers() {
  return new Promise((resolve, reject) => {
    USER.getAllUsers()
        .then(res => resolve(res))
        .catch(err => reject(err));
  });
}

function deleteUser(username) {
  return new Promise((resolve, reject) => {
    USER.deleteUser(username)
        .then(res => resolve(res))
        .catch(err => reject(err));
  });
}

function updateUser(newUserData) {
  return new Promise((resolve, reject) => {
    B_CRYPT.genSalt(CONFIG.saltRounds, function(err, salt) {
      B_CRYPT.hash(newUserData.password, salt, function (err, hash) {
        if (err) {
          next(err);
        }
        else {
          newUserData = {...newUserData, password : hash}
          USER.updateUser(newUserData)
              .then(res => resolve(res))
              .catch(err => reject(err));
        }
      });
    });
  });
}

module.exports = {
  addUser,
  getUserByRole,
  loginUser,
  getUserByUsername,
  getAllUsers,
  deleteUser,
  updateUser
}