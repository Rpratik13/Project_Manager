import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as updateTaskAction from '../../action/updateTaskAction';
import { Redirect } from 'react-router-dom';

const QS = require('query-string');


function createOption(manager) {
  return <option key={manager.username} value={manager.username}>{manager.username}</option>
}

function UpdateTask (props) {
    let projectId = (QS.parse(props.location.search).projectId);
    let taskId = (QS.parse(props.location.search).taskId);
    let {getProjectUsers, getProjectData, getTaskData} = props;
    useEffect(() => {
      getProjectUsers(projectId);
      getProjectData(projectId);
      getTaskData(taskId);
    }, [getProjectUsers, getProjectData, getTaskData, projectId, taskId]);
    let projectUsers = []
    props.taskAssignees.forEach(assignee => projectUsers.push(assignee.username))
    if (props.updateTaskRedirect ||
      (window.localStorage.getItem('role') === 'team lead' && !projectUsers.includes(window.localStorage.getItem('username')) && props.taskName !== '') ||
      ((window.localStorage.getItem('role') !== 'admin') 
      && (props.projectData.length && props.projectData[0].manager_id !== window.localStorage.getItem('username'))
      && (window.localStorage.getItem('role') !== 'team lead' && props.oldTaskAssignee !== (window.localStorage.getItem('username')))
      && props.taskName !== '')) {
      return <Redirect to = '/'></Redirect>
    }
    let oldAssignee = props.previousAssignee;
    if (props.taskAssignee !== props.oldTaskAssignee) {
      oldAssignee = props.oldTaskAssignee;
    }

    return (<div style={{position:"relative", width: "100%"}}>
            <div className = "col-md-offset-5 col-md-4 text-center mx-auto" style={{paddingTop: "40px"}}>
            <h1>Update Task</h1>
            <div className="form-register"><br />
            {props.updateTaskError && <label>{props.updateTaskError}</label>}
            <form 
              onSubmit = { event => {
                event.preventDefault();
                props.updateTask(projectId, props.taskName, props.taskDesc, props.taskDeadline, props.taskAssignee, oldAssignee, taskId);
              }}>
              <input 
                onChange = {event => {
                  props.setTaskName(event.target.value)
                }}
                placeholder = 'Enter Task Name'
                type        = "text" 
                value       = {props.taskName} 
                className   = "form-control"
              />
              <br />
              <textarea
                onChange = {event => {
                  props.setTaskDesc(event.target.value)
                }}
                placeholder = 'Enter task description'
                value       = {props.taskDesc} 
                className   = "form-control"
              />
              <br />
              <input 
                onChange = {event => {
                  props.setTaskDeadline(event.target.value)
                }}
                value = {props.taskDeadline}
                className   = "form-control"
                type = "date"/>
              <br />
              <select
              id       = "type" 
              name     = "type"
              className   = "form-control"
              onChange = {event => { 
                props.setTaskAssignee(event.target.value)
              }}
              defaultValue = "Choose Task Assignee"
            >
              <option disabled>Choose Task Assignee</option>
              {props.taskAssignees.map(manager => createOption(manager))}
            </select>
              <button type="submit" className="btn btn-primary mt-2">Update</button>
            </form>
            </div>
            </div>
          <form onSubmit = {(event) => {
            event.preventDefault();
            props.deleteTask(taskId)
            }}
            style={{position:"absolute", top:"20px", right:"20px"}} >
              <button type = "submit" className="btn btn-danger">Delete</button>
            </form>
          </div>
        );
}

function mapStateToProps (state) {
  return ({
    taskName : state.updateTask.taskName,
    taskDesc : state.updateTask.taskDesc,
    taskDeadline : state.updateTask.taskDeadline,
    taskAssignee : state.updateTask.taskAssignee,
    taskAssignees : state.updateTask.taskAssignees,
    updateTaskError  : state.updateTask.updateTaskError,
    updateTaskRedirect : state.updateTask.updateTaskRedirect,
    projectData : state.updateTask.projectData,
    oldTaskAssignee : state.updateTask.oldTaskAssignee,
    previousAssignee : state.updateTask.previousAssignee
  });
}

function mapDispatchToProps (dispatch) {
  return {
    setTaskName: taskName => {
      dispatch(updateTaskAction.setTaskName(taskName));
    },
    
    setTaskDesc: taskDesc => {
      dispatch(updateTaskAction.setTaskDesc(taskDesc));
    },

    setTaskDeadline: deadline => {
      dispatch(updateTaskAction.setTaskDeadline(deadline));
    },

    setTaskAssignee: assignee => {
      dispatch(updateTaskAction.setTaskAssignee(assignee));
    },

    getProjectUsers: (projectId) => {
      dispatch(updateTaskAction.getProjectUsers(projectId));
    },

    updateTask: (projectId, taskName, taskDesc, taskDeadline, taskAssignee, oldAssignee, taskId) => {
      dispatch(updateTaskAction.updateTask(projectId, taskName, taskDesc, taskDeadline, taskAssignee, oldAssignee, taskId))
    },

    getTaskData : (taskId) => {
      dispatch(updateTaskAction.getTaskData(taskId));
    },

    getProjectData : (projectId) => {
      dispatch(updateTaskAction.getProjectData(projectId));
    },

    deleteTask : (taskId) => {
      dispatch(updateTaskAction.deleteTask(taskId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTask);