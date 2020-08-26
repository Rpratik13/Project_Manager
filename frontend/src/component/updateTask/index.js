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
    useEffect(() => {
      props.getProjectUsers(projectId);
      props.getTaskData(taskId);
    }, []);

    if (props.updateTaskRedirect || window.localStorage.getItem('role') !== 'admin') {
      return <Redirect to = '/'></Redirect>
    }

    return (<div className="row">
            <div className = "col-md-offset-5 col-md-4 text-center">
            <h1 className='text-white'>Update Task</h1>
            <div className="form-register"><br />
            {props.updateTaskError && <label>{props.updateTaskError}</label>}
            <form 
              onSubmit = { event => {
                event.preventDefault();
                props.updateTask(projectId, props.taskName, props.taskDesc, props.taskDeadline, props.taskAssignee, taskId);
              }}>
              <input 
                onChange = {event => {
                  props.setTaskName(event.target.value)
                }}
                placeholder = 'Enter Task Name'
                type        = "text" 
                value       = {props.taskName} 
              />
              <br />
              <textarea
                onChange = {event => {
                  props.setTaskDesc(event.target.value)
                }}
                placeholder = 'Enter task description'
                value       = {props.taskDesc} 
              />
              <input 
                onChange = {event => {
                  props.setTaskDeadline(event.target.value)
                }}
                value = {props.taskDeadline}
                type = "date"/>
              <br />
              <br />
              <select
              className = "type" 
              id       = "type" 
              name     = "type"
              onChange = {event => { 
                props.setTaskAssignee(event.target.value)
              }}
            >
              <option selected disabled>Choose Task Assignee</option>
              {props.taskAssignees.map(manager => createOption(manager))}
            </select>
              <button type="submit"></button>
            </form>
          <form onSubmit = {(event) => {
            event.preventDefault();
            props.deleteTask(taskId)
            }} >
              <button type = "submit"></button>
            </form>
            </div>
          </div>
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
    updateTaskRedirect : state.updateTask.updateTaskRedirect
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

    updateTask: (projectId, taskName, taskDesc, taskDeadline, taskAssignee, taskId) => {
      dispatch(updateTaskAction.updateTask(projectId, taskName, taskDesc, taskDeadline, taskAssignee, taskId))
    },

    getTaskData : (taskId) => {
      dispatch(updateTaskAction.getTaskData(taskId));
    },

    deleteTask : (taskId) => {
      dispatch(updateTaskAction.deleteTask(taskId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTask);