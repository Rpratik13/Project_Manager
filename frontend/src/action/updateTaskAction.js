import * as httpUtils from '../utils/http';
import * as config from '../configs/appconfig';

export const SET_TASK_NAME    = 'SET_PROJECT_NAME';
export const SET_TASK_DESC    = 'SET_PROJECT_DESC';
export const SET_TASK_DEADLINE = 'SET_TASK_DEADLINE';
export const SET_TASK_ASSIGNEE = 'SET_TASK_ASSIGNEE';
export const GET_PROJECT_USERS     = 'GET_PROJECT_USERS';
export const SET_PROJECT_USERS = 'SET_PROJECT_USERS'
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK_ERROR = 'UPDATE_TASK_ERROR';
export const UPDATE_TASK_REDIRECT = 'UPDATE_TASK_REDIRECT';
export const GET_TASK_DATA = 'GET_TASK_DATA';
export const DELETE_TASK = 'DELETE_TASK';

export const setTaskName = taskName => ({
  payload : taskName,
  type    : SET_TASK_NAME,
});

export const setTaskDesc = taskDesc => ({
  payload : taskDesc,
  type    : SET_TASK_DESC,
});

export const setTaskDeadline = deadline => ({
  payload : deadline,
  type    : SET_TASK_DEADLINE
});

export const setTaskAssignee = assignee => ({
  payload : assignee,
  type    : SET_TASK_ASSIGNEE
});


export const getProjectUsers = (projectId) => {
  return function action(dispatch) {
    dispatch({
      type : GET_PROJECT_USERS
    })
    return httpUtils.get(config.endPoints.projectUser + projectId)
            .then(res => {
              if (res.length) {
                  dispatch({
                    type : SET_PROJECT_USERS,
                    payload : res
                  })
              }
            })
  }
} 


export const updateTask = (projectId, taskName, taskDesc, taskDeadline, taskAssignee, taskId) => {
  return function action(dispatch) {
    dispatch({
      type : ADD_TASK
    })
    return httpUtils.post(config.endPoints.updateTask, {
      projectId : projectId,
      taskId : taskId,
      desc : taskDesc,
      deadline : taskDeadline,
      assignee : taskAssignee,
      taskName : taskName
    })
                .then(res => {
                  console.log(res);
              if (res.status === 400)  {
                dispatch({
                  type    : UPDATE_TASK_ERROR,
                  payload : res.msg
                })
              }
              else if (res.status === 200) {
                  dispatch({
                    type : UPDATE_TASK_REDIRECT,
                    payload : true
                  })
                }
              })
  }
} 

export const getTaskData = (taskId) => {
  return function action(dispatch) {
    dispatch({
      type : GET_TASK_DATA
    })
    return httpUtils.get(config.endPoints.taskById + taskId)
           .then(res => {
             if (res && res.length) {
              dispatch({
                type : SET_TASK_NAME,
                payload : res[0].task_name
              })

              dispatch({
                type : SET_TASK_DESC,
                payload : res[0].task_desc
              })
             }
           })
  }
}


export const deleteTask = (taskId) => {
  return function action(dispatch) {
    dispatch({
      type : DELETE_TASK
    })
    return httpUtils.post(config.endPoints.deleteTask, { taskId })
           .then(res => {
             dispatch({
              type : UPDATE_TASK_REDIRECT,
              payload : true
          })
        })
  }
}