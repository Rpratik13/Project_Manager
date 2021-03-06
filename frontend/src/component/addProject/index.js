import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as addProjectAction from '../../action/addProjectAction';
import { Redirect } from 'react-router-dom';


function createOption(manager) {
 return <option key={manager.username} value={manager.username}>{manager.username}</option>
}

function AddProject (props) {
   let getManagers = props.getManagers;
    useEffect(() => {
      getManagers();
    }, [getManagers]);

    if (props.addProjectRedirect || window.localStorage.getItem('role') !== 'admin') {
      return <Redirect to = '/'></Redirect>
    }

    return (<div >
            <div className = "col-md-offset-5 col-md-4 text-center mx-auto"  style={{paddingTop: "50px"}}>
            <h1 className='text-black'>Add a Project</h1>
            <div className="form-register"><br />
            {props.addProjectError && <label style={{color:"red"}}>{props.addProjectError}</label>}
            <form 
              onSubmit = { event => {
                event.preventDefault();
                props.addProject(props.addProjectName, props.addProjectDesc, props.addProjectManager);
              }}>
              <input 
                onChange = {event => {
                  props.setProjectName(event.target.value)
                }}
                className = "form-control"
                placeholder = 'Enter ProjectName'
                type        = "text" 
                value       = {props.addProjectName} 
              />
              <br />
              <textarea
                onChange = {event => {
                  props.setProjectDesc(event.target.value)
                }}
                placeholder = 'Enter project description'
                value       = {props.addProjectDesc}
                className = "form-control"
              />
              <br />
              <select
              className = "form-control" 
              id       = "type" 
              name     = "type"
              onChange = {event => { 
                props.setProjectManager(event.target.value)
              }}
              defaultValue="Choose Project Manager"
            >
              <option disabled>Choose Project Manager</option>
              {props.projectManagers.map(manager => createOption(manager))}
            </select>
              <button type="submit" className="btn btn-primary mt-2">Create</button>
            </form>
            </div>
          </div>
          </div>
        );
}

function mapStateToProps (state) {
  return ({
    addProjectName : state.addProject.addProjectName,
    addProjectDesc : state.addProject.addProjectDesc,
    addProjectManager : state.addProject.addProjectManager,
    projectManagers : state.addProject.projectManagers,
    addProjectError : state.addProject.addProjectError,
    addProjectRedirect : state.addProject.addProjectRedirect
  });
}

function mapDispatchToProps (dispatch) {
  return {
    setProjectName: projectName => {
      dispatch(addProjectAction.setProjectName(projectName));
    },
    
    setProjectDesc: projectDesc => {
      dispatch(addProjectAction.setProjectDesc(projectDesc));
    },

    setProjectManager: manager => {
      dispatch(addProjectAction.setProjectManager(manager));
    },

    getManagers: () => {
      dispatch(addProjectAction.getManagers());
    },

    addProject: (projectName, projectDesc, projectManager) => {
      dispatch(addProjectAction.addProject(projectName, projectDesc, projectManager));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);