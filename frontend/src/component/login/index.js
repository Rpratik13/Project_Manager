import React from 'react';
import { connect } from 'react-redux';
import * as loginAction from '../../action/loginAction';
import { Redirect } from 'react-router-dom';



function Login (props) {
  if (window.localStorage.getItem('username') || props.loginRedirect) {
    return <Redirect to = "/dashboard" />
  }
  return (<div className="row">
            <div className = "col-md-offset-5 col-md-4 text-center">
            <h1 className='text-white'>Login</h1>
            <div className="form-login"><br />
            {props.loginError && <label>{props.loginError}</label>}
            <form 
              onSubmit = { event => {
                event.preventDefault();
                props.login(props.loginUsername, props.loginPassword);
              }}>
              <input 
                onChange = {event => {
                  props.setUsername(event.target.value)
                }}
                placeholder = 'Enter Username'
                type        = "text" 
                value       = {props.loginUsername} 
              />
              
              <input 
                onChange = {event => {
                  props.setPassword(event.target.value)
                }}
                placeholder = 'Enter Password'
                type        = "password" 
                value       = {props.loginPassword} 
              />
              <button type="submit"></button>
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