import * as httpUtils from '../utils/http';
import * as config from '../configs/appconfig';

export const SET_FNAME    = 'SET_FNAME';
export const SET_LNAME    = 'SET_LNAME';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_ROLE     = 'SET_ROLE';
export const USER_REGISTER   = 'USER_REGISTER';
export const REGISTER_ERROR  = 'REGISTER_ERROR';
export const REDIRECT = 'REDIRECT';

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
  type    : REDIRECT
});

export const userRegister = (fname, lname, username, password, role, cookie) => {
  return function action(dispatch) {
    dispatch({
      type : USER_REGISTER
    })
    return httpUtils.post(config.endPoints.register, {
                    fname    : fname,
                    lname    : lname,
                    username : username,
                    password : password,
                    role     : role
                  })
            .then(res => {
              if (res.status === 400)  {
                dispatch({
                  type    : REGISTER_ERROR,
                  payload : res.msg
                })
              }
              else if (res.status === 200) {
                dispatch({
                  type : REDIRECT,
                  payload : true
                })
              }
            })
  }
} 