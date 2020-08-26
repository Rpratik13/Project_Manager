import * as httpUtils from '../utils/http';
import * as config from '../configs/appconfig';

export const SET_TASK_NAME    = 'SET_PROJECT_NAME';
export const SET_TASK_DESC    = 'SET_PROJECT_DESC';
export const SET_TASK_DEADLINE = 'SET_TASK_DEADLINE';
export const SET_TASK_ASSIGNEE = 'SET_TASK_ASSIGNEE';
export const GET_PROJECT_USERS     = 'GET_PROJECT_USERS';
export const SET_PROJECT_USERS = 'SET_PROJECT_USERS'
export const ADD_TASK = 'ADD_TASK';
export const ADD_TASK_ERROR = 'ADD_TASK_ERROR';
export const ADD_TASK_REDIRECT = 'ADD_TASK_REDIRECT';

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


export const addTask = (projectId, taskName, taskDesc, taskDeadline, taskAssignee) => {
  return function action(dispatch) {
    dispatch({
      type : ADD_TASK
    })
    return httpUtils.post(config.endPoints.addTask, {
      projectId : projectId,
      taskId : taskName,
      desc : taskDesc,
      deadline : taskDeadline,
      assignee : taskAssignee
    })
                .then(res => {
              if (res.status === 400)  {
                dispatch({
                  type    : ADD_TASK_ERROR,
                  payload : res.msg
                })
              }
              else if (res.status === 200) {
                  dispatch({
                    type : ADD_TASK_REDIRECT,
                    payload : true
                  })
                }
              })
            .catch(err => console.log(err));
  }
} 