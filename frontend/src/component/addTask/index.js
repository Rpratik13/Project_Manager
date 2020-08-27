import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as addTaskAction from '../../action/addTaskAction';
import { Redirect } from 'react-router-dom';

const QS = require('query-string');


function createOption(manager) {
 return <option key={manager.username} value={manager.username}>{manager.username}</option>
}

function AddTask (props) {
    let projectId = (QS.parse(props.location.search).projectId);
    useEffect(() => {
      props.getProjectUsers(projectId);
    }, []);
    if (props.addTaskRedirect || window.localStorage.getItem('role') === 'engineer') {
      return <Redirect to = {`/dashboard/projects/${projectId}`}></Redirect>
    }
    return (<div>
            <div className = "mx-auto col-md-offset-5 col-md-4 text-center" style={{paddingTop: "50px"}}>
            <h1 className='text-black'>Add a Task</h1>
            <h2>{projectId}</h2>
            <div className="form-register"><br />
            {props.addTaskError && <label style={{color : "red"}}>{props.addTaskError}</label>}
            <form 
              onSubmit = { event => {
                event.preventDefault();
                props.addTask(projectId, props.taskName, props.taskDesc, props.taskDeadline, props.taskAssignee);
              }}>
              <input 
                onChange = {event => {
                  props.setTaskName(event.target.value)
                }}
                placeholder = 'Enter Task Name'
                type        = "text" 
                className = "form-control"
                value       = {props.taskName} 
              />
              <br />
              <textarea
                onChange = {event => {
                  props.setTaskDesc(event.target.value)
                }}
                placeholder = 'Enter task description'
                value       = {props.taskDesc} 
                className = "form-control"
              />
              <input 
                onChange = {event => {
                  props.setTaskDeadline(event.target.value)
                }}
                className = "form-control mt-3"
                type = "date"/>
              <br />
              <br />
              <select
              className = "form-control" 
              id       = "type" 
              name     = "type"
              onChange = {event => { 
                props.setTaskAssignee(event.target.value)
              }}
            >
              <option selected disabled>Choose Task Assignee</option>
              {props.taskAssignees.map(manager => createOption(manager))}
            </select>
              <button type="submit" className="btn btn-primary mt-3">Add Task</button>
            </form>
            </div>
          </div>
          </div>
        );
}

function mapStateToProps (state) {
  return ({
    taskName : state.addTask.taskName,
    taskDesc : state.addTask.taskDesc,
    taskDeadline : state.addTask.taskDeadline,
    taskAssignee : state.addTask.taskAssignee,
    taskAssignees : state.addTask.taskAssignees,
    addTaskError  : state.addTask.addTaskError,
    addTaskRedirect : state.addTask.addTaskRedirect
  });
}

function mapDispatchToProps (dispatch) {
  return {
    setTaskName: taskName => {
      dispatch(addTaskAction.setTaskName(taskName));
    },
    
    setTaskDesc: taskDesc => {
      dispatch(addTaskAction.setTaskDesc(taskDesc));
    },

    setTaskDeadline: deadline => {
      dispatch(addTaskAction.setTaskDeadline(deadline));
    },

    setTaskAssignee: assignee => {
      dispatch(addTaskAction.setTaskAssignee(assignee));
    },

    getProjectUsers: (projectId) => {
      dispatch(addTaskAction.getProjectUsers(projectId));
    },

    addTask: (projectId, taskName, taskDesc, taskDeadline, taskAssignee) => {
      dispatch(addTaskAction.addTask(projectId, taskName, taskDesc, taskDeadline, taskAssignee))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);