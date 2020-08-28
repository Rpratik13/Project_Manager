import React from 'react';
import { connect } from 'react-redux';
import * as loginAction from '../../action/loginAction';
import { Redirect } from 'react-router-dom';
import './style.css'



function Login (props) {
  if (window.localStorage.getItem('username') || props.loginRedirect) {
    return <Redirect to = "/dashboard" />
  }
  return (<div>
            <div className = "login-form mx-auto col-md-offset-5 col-md-4">
            <h1 className='text-black'>Login</h1>
            <div className="form-login"><br />
            {props.loginError && <label style={{color : "red"}}>{props.loginError}</label>}
            <form 
              onSubmit = { event => {
                event.preventDefault();
                props.login(props.loginUsername, props.loginPassword);
              }}>
              <div className="form-group">
              <input 
                onChange = {event => {
                  props.setUsername(event.target.value)
                }}
                placeholder = 'Enter Username'
                type        = "text" 
                value       = {props.loginUsername} 
                className="form-control" 
              />
              </div>
              <div className="form-group">
              <input 
                onChange = {event => {
                  props.setPassword(event.target.value)
                }}
                placeholder = 'Enter Password'
                type        = "password" 
                value       = {props.loginPassword} 
                className="form-control" 
              />
              </div>
              <button type="submit" className="btn btn-primary">Log In</button>
            </form>
            </div>
          </div>
          </div>
        );
}

function mapStateToProps (state) {
  return ({
    loginUsername : state.login.loginUsername,
    loginPassword : state.login.loginPassword,
    loginError    : state.login.loginError,
    loginRedirect : state.login.loginRedirect
  });
}

function mapDispatchToProps (dispatch) {
  return {
    setUsername: loginUsername => {
      dispatch(loginAction.setUsername(loginUsername));
    },
    
    setPassword: loginPassword => {
      dispatch(loginAction.setPassword(loginPassword));
    },

    login: (username, password) => {
      dispatch(loginAction.userLogin(username, password));
    },

    setRedirect: () => {
      dispatch(loginAction.setRedirect(true))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);