import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as updateProjectAction from '../../action/updateProjectAction';
import { Redirect } from 'react-router-dom';

const QS = require('query-string');

function createOption(manager) {
 return <option key={manager.username} value={manager.username}>{manager.username}</option>
}

function showSelectProjectManager(props) {
  if (window.localStorage.getItem('role') === 'admin') {
    return (<select
      id       = "type" 
      name     = "type"
      className   = "form-control"
      onChange = {event => { 
        props.setProjectManager(event.target.value)
      }}
      defaultValue = "Choose Project Manager"
    >
      <option disabled>Choose Project Manager</option>
      {props.projectManagers.map(manager => createOption(manager))}
    </select>)
  }
}

function showDeleteButton(props, projectId) {
  if (window.localStorage.getItem('role') === 'admin') 
  return  <form onSubmit = {(event) => {
    event.preventDefault()
    props.deleteProject(projectId)}}
    style={{position:"absolute", top:"20px", right:"20px"}}>
    <button type = "submit" className="btn btn-danger">Delete</button>
  </form>
}
function UpdateProject (props) {
    let projectId = (QS.parse(props.location.search).projectId);
    let {getProjectData, getManagers} = props;
    useEffect(() => {
      getProjectData(projectId);
      getManagers();
    }, [getProjectData, getManagers, projectId]);
    if (props.updateProjectRedirect || 
      (window.localStorage.getItem('role') !== 'admin' &&  
      ((window.localStorage.getItem('role') !== 'project manager') ||(
      (window.localStorage.getItem('role') === 'project manager') && props.updateProjectManager !== window.localStorage.getItem('username') && props.updateProjectManager)))) {
      return <Redirect to = '/'></Redirect>
    }
    return (<div style={{position:"relative", width: "100%"}}>
            <div className = "col-md-offset-5 col-md-4 text-center mx-auto" style={{paddingTop : "50px"}}>
            <h1>Update Project</h1>
            <div className="form-register"><br />
            {props.updateProjectError && <label>{props.updateProjectError}</label>}
            <form 
              onSubmit = { event => {
                event.preventDefault();
                props.updateProject(props.updateProjectName, props.updateProjectDesc, props.updateProjectManager, projectId, props.oldProjectManager);
              }}>
              <input 
                onChange = {event => {
                  props.setProjectName(event.target.value)
                }}
                placeholder = 'Enter Project Name'
                type        = "text" 
                value       = {props.updateProjectName} 
                className   = "form-control"
              />
              <br />
              <textarea
                onChange = {event => {
                  props.setProjectDesc(event.target.value)
                }}
                placeholder = 'Enter project description'
                value       = {props.updateProjectDesc}
                className   = "form-control" 
              />
              <br />
              {showSelectProjectManager(props)}
              <button type="submit" className="btn btn-primary mt-2">Update</button>
            </form>
            </div>
          </div>
              {showDeleteButton(props, projectId)}
          </div>
        );
}

function mapStateToProps (state) {
  return ({
    updateProjectName : state.updateProject.updateProjectName,
    updateProjectDesc : state.updateProject.updateProjectDesc,
    updateProjectManager : state.updateProject.updateProjectManager,
    projectManagers : state.updateProject.projectManagers,
    updateProjectError : state.updateProject.updateProjectError,
    updateProjectRedirect : state.updateProject.updateProjectRedirect
  });
}

function mapDispatchToProps (dispatch) {
  return {
    setProjectName: projectName => {
      dispatch(updateProjectAction.setProjectName(projectName));
    },
    
    setProjectDesc: projectDesc => {
      dispatch(updateProjectAction.setProjectDesc(projectDesc));
    },

    setProjectManager: manager => {
      dispatch(updateProjectAction.setProjectManager(manager));
    },

    getManagers: () => {
      dispatch(updateProjectAction.getManagers());
    },

    updateProject: (projectName, projectDesc, projectManager, oldName, oldManager) => {
      dispatch(updateProjectAction.updateProject(projectName, projectDesc, projectManager, oldName, oldManager));
    },

    getProjectData : (projectId) => {
      dispatch(updateProjectAction.getProjectData(projectId));
    },

    deleteProject : (projectId) => {
      dispatch(updateProjectAction.deleteProject(projectId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProject);