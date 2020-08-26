import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as updateProjectAction from '../../action/updateProjectAction';
import { Redirect } from 'react-router-dom';

const QS = require('query-string');

function createOption(manager) {
 return <option key={manager.username} value={manager.username}>{manager.username}</option>
}

function UpdateProject (props) {
    let projectId = (QS.parse(props.location.search).projectId);
    useEffect(() => {
      props.getProjectData(projectId);
      props.getManagers();
    }, []);
    if (props.updateProjectRedirect || window.localStorage.getItem('role') !== 'admin') {
      return <Redirect to = '/'></Redirect>
    }
    return (<div className="row">
            <div className = "col-md-offset-5 col-md-4 text-center">
            <h1 className='text-white'>Update Project</h1>
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
              />
              <br />
              <textarea
                onChange = {event => {
                  props.setProjectDesc(event.target.value)
                }}
                placeholder = 'Enter project description'
                value       = {props.updateProjectDesc} 
              />
              <br />
              <br />
              <select
              className = "type" 
              id       = "type" 
              name     = "type"
              onChange = {event => { 
                props.setProjectManager(event.target.value)
              }}
            >
              <option selected disabled>Choose Project Manager</option>
              {props.projectManagers.map(manager => createOption(manager))}
            </select>
              <button type="submit"></button>
            </form>
            <form onSubmit = {(event) => {
              event.preventDefault()
              props.deleteProject(projectId)}}>
              <button type = "submit"/>
            </form>
            </div>
          </div>
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