import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as updateUserAction from '../../action/updateUserAction';
import { Redirect } from 'react-router-dom';


function UserUpdate (props) {
  useEffect(() => {
    if (props.fetchData) {
      props.getUserData(props.match.params.username)
    }
  })  
  if (props.redirectFromUpdate || window.localStorage.getItem('role') !== 'admin') {
      return <Redirect to = '/'></Redirect>
    }


    return (<div style={{position:"relative", width: "100%"}}>
            <div className = "col-md-offset-5 col-md-4 text-center mx-auto" style={{paddingTop: "40px"}}>
            <h1>Update User</h1>
            <div className="form-register"><br />
            {props.error && <label>{props.error}</label>}
            <form 
              onSubmit = { event => {
                event.preventDefault();
                props.updateUser(props.fname, props.lname, props.username, props.password, props.role, props.oldUsername)
              }}>
              <input 
                onChange = {event => {
                  props.setFname(event.target.value)
                }}
                placeholder = 'Enter First Name'
                type        = "text" 
                value       = {props.fname} 
                className   = "form-control"
              />
              <br />
              <input 
                onChange = {event => {
                  props.setLname(event.target.value)
                }}
                placeholder = 'Enter LastName'
                type        = "text" 
                value       = {props.lname} 
                className   = "form-control"
              />
              <br />
              <input 
                onChange = {event => {
                  props.setUsername(event.target.value)
                }}
                placeholder = 'Enter Username'
                type        = "text" 
                value       = {props.username} 
                className   = "form-control"
              />
              <br />
              <input 
                onChange = {event => {
                  props.setPassword(event.target.value)
                }}
                placeholder = 'Enter Password'
                type        = "password" 
                value       = {props.password} 
                className   = "form-control"
              />
              <br />
              <select
              className = "type" 
              id       = "type" 
              name     = "type"
              onChange = {event => { 
                props.setRole(event.target.value)
              }}
              className   = "form-control"
            >
              <option key="project manager" value = "project manager">Project Manager</option>
              <option key="team lead" value = "team lead">Team Lead</option>
              <option key="engineer" value = "engineer">Engineer</option>
            </select>
              <button type="submit" className="btn btn-primary mt-2">Update</button>
            </form>
            </div>
            </div>
            <form 
              style={{position: "absolute", top: "20px", right:"20px"}}
              onSubmit = { event => {
                event.preventDefault();
                props.deleteUser(props.oldUsername)
              }}><button type="submit" className="btn btn-danger">Delete</button></form>
          </div>
        );
}

function mapStateToProps (state) {
  return ({
    fname : state.updateUser.fname,
    lname : state.updateUser.lname,
    role : state.updateUser.role,
    username : state.updateUser.username,
    password : state.updateUser.password,
    error    : state.updateUser.error, 
    redirectFromUpdate : state.updateUser.redirectFromUpdate,
    oldUsername : state.updateUser.oldUsername,
    fetchData   : state.updateUser.fetchData
  });
}

function mapDispatchToProps (dispatch) {
  return {
    setUsername: registerUsername => {
      dispatch(updateUserAction.setUsername(registerUsername));
    },
    
    setPassword: registerPassword => {
      dispatch(updateUserAction.setPassword(registerPassword));
    },

    setFname: fname => {
      dispatch(updateUserAction.setFname(fname));
    },

    setLname: lname => {
      dispatch(updateUserAction.setLname(lname));
    },

    setRole: role => {
      dispatch(updateUserAction.setRole(role));
    },

    redirect: () => {
      dispatch(updateUserAction.redirect(false));
    },

    getUserData: username => {
      dispatch(updateUserAction.getUserData(username))
    },

    updateUser : (fname, lname, username, password, role, oldUsername) => {
      dispatch(updateUserAction.updateUser(fname, lname, username, password, role, oldUsername))
    },

    deleteUser : (username) => {
      dispatch(updateUserAction.deleteUser(username))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdate);