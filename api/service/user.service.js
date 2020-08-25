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
          USER.getUserByUsername(userData.username)
              .then(res => {
                if (res.length){
                  reject({
                    msg: 'Username Already Taken',
                    status : 400
                  })
                }
                else {
                  USER.addUser(userData)
                      .then(res => {
                        resolve({
                        msg    : 'Successfully Registered',
                        status : 200
                      })

                    })
                      .catch(err => reject(err));
                }
              })
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
        if (!res.length) {
          reject({
            msg    : 'Invalid Username or Password',
            status : 400
          })
        }
        else {
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
            else {
              reject({
                msg    : 'Invalid Username or Password',
                status : 400
              });
            }
          });
        }
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