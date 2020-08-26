import * as httpUtils from '../utils/http';
import * as config from '../configs/appconfig';

export const SET_FNAME    = 'SET_FNAME';
export const SET_LNAME    = 'SET_LNAME';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_ROLE     = 'SET_ROLE';
export const USER_UPDATE   = 'USER_UPDATE';
export const UPDATE_ERROR  = 'UPDATE_ERROR';
export const UPDATE_REDIRECT = 'UPDATE_REDIRECT';
export const REDIRECT_FROM_UPDATE = 'REDIRECT_FROM_UPDATE'
export const GET_USER_DATA = 'GET_USER_DATA';
export const SET_OLD_USERNAME = 'SET_OLD_USERNAME'
export const UPDATE_USER = 'UPDATE_USER';
export const SET_FETCH_DATA = 'SET_FETCH_DATA';
export const DELETE_USER = 'DELETE_USER';

export const setUsername = username => ({
  payload : username,
  type    : SET_USERNAME,
});

export const setPassword = password => ({
  payload : password,
  type    : SET_PASSWORD,
});

export const setFname = fname => ({
  payload : fname,
  type    : SET_FNAME
});

export const setLname = lname => ({
  payload : lname,
  type    : SET_LNAME
});

export const setRole = role => ({
  payload : role,
  type    : SET_ROLE
});

export const redirect = val => ({
  payload : val,
  type    : REDIRECT_FROM_UPDATE
});
 
export const getUserData = (username) => {
  return function action(dispatch) {
    dispatch({
      type : GET_USER_DATA
    })
    return httpUtils.get(config.endPoints.getUserData + username)
             .then(res => {
               dispatch({
                 payload : res.fname,
                 type : SET_FNAME
               })
               dispatch({
                 payload : res.lname,
                 type : SET_LNAME
               })
               dispatch({
                 payload : res.username,
                 type : SET_USERNAME
               })
               dispatch({
                 payload : res.username,
                 type : SET_OLD_USERNAME
               })
               dispatch({
                 payload : res.role,
                 type : SET_ROLE
               })
               dispatch({
                 payload : false,
                 type : SET_FETCH_DATA
               })
             });
  }
}

export const updateUser = (fname, lname, username, password, role, oldUsername) => {
  return function action(dispatch) {
    dispatch({
      type : UPDATE_USER
    })
    return httpUtils.post(config.endPoints.userUpdate, {
                    fname    : fname,
                    lname    : lname,
                    username : username,
                    password : password,
                    role     : role,
                    oldUsername : oldUsername
                  })
            .then(res => {
              console.log(res)
              if (res.status === 400)  {
                dispatch({
                  type    : UPDATE_ERROR,
                  payload : res.msg
                })
              }
              else if (res.status === 200) {
                dispatch({
                  type : REDIRECT_FROM_UPDATE,
                  payload : true
                })
              }
            })
            .catch(err => console.log(err));
  }
}

export const deleteUser = (username) => {
  return function action(dispatch) {
    dispatch({
      type : DELETE_USER
    })
    return httpUtils.post(config.endPoints.userDelete, {
                    username : username,
                  })
            .then(res => {
                dispatch({
                  type : REDIRECT_FROM_UPDATE,
                  payload : true
                })
            })
            .catch(err => console.log(err));
  }
}