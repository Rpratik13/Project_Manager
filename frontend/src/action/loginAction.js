import * as httpUtils from '../utils/http';
import * as config from '../configs/appconfig';


export const SET_USERNAME = 'SET_USERNAME';
export const SET_PASSWORD = 'SET_PASSWORD';
export const USER_LOGIN   = 'USER_LOGIN';
export const LOGIN_ERROR  = 'LOGIN_ERROR';
export const LOGIN_REDIRECT       = 'LOGIN_REDIRECT';



export const setUsername = username => ({
  payload : username,
  type    : SET_USERNAME,
});

export const setPassword = password => ({
  payload : password,
  type    : SET_PASSWORD,
});

export const setRedirect = () => ({
  payload : true,
  type    : LOGIN_REDIRECT,
});

export const userLogin = (username, password) => {
  return function action(dispatch) {
    dispatch({
      type : USER_LOGIN
    })
    return httpUtils.post(config.endPoints.login, {
                    username : username,
                    password : password,
                  })
            .then(res => {
              if (res.status === 200) {
                window.localStorage.setItem('fname', res.fname)
                window.localStorage.setItem('lname', res.lname)
                window.localStorage.setItem('role', res.role)
                window.localStorage.setItem('token', res.token)
                window.localStorage.setItem('username', res.username)
                window.location.reload(true);
              } else {
                dispatch({
                  type    : LOGIN_ERROR,
                  payload : res.msg
                })
              }
            })
            .catch(err => console.log(err));
  }
}