import * as httpUtils from '../utils/http';
import * as config from '../configs/appconfig';

export const GET_PROJECT_DATA = 'GET_PROJECT_DATA';
export const SET_PROJECT_DATA = 'SET_PROJECT_DATA';
export const SET_TASK = 'SET_TASK';
export const GET_TASK = 'GET_TASK';
export const GET_USERS = 'GET_USERS';
export const ADD_USER = 'ADD_USER';
export const GET_ENGINEER = 'GET_ENGINEER';
export const GET_TEAM_LEAD = 'GET_TEAM_LEAD';
export const SET_USERS = 'SET_USERS';
export const SET_PROJECT_USERS = 'SET_PROJECT_USERS';
export const SET_ADD_USER = 'SET_ADD_USER';
export const REMOVE_USER = 'REMOVE_USER'

export const GET_TAGGED_TASKS = 'GET_TAGGED_TASKS';
export const SET_TAGGED_TASKS = 'SET_TAGGED_TASKS';
export const SET_REDIRECT = 'SET_REDIRECT'


export const setRedirect = () => {
  return ({
    type : SET_REDIRECT,
    payload : true
  })
}
export const getTaggedTasks = (username) => {
  return function action(dispatch) {
    dispatch({
      type : GET_TAGGED_TASKS
    })
    return httpUtils.get(config.endPoints.getTaggedTask + username)
                .then(res => {
                  if (res.length) {
                  dispatch({
                    type : SET_TAGGED_TASKS,
                    payload : res
                  })
                }
            })
  }
}


export const setAddUser = (username) => {
  return ({
    type : SET_ADD_USER,
    payload: username
  })
}

export const getProjectData = (projectId) => {
  return function action(dispatch) {
    dispatch({
      type : GET_PROJECT_DATA
    })
    return httpUtils.get(config.endPoints.projectById + projectId)
                .then(res => {
                  if (res.length) {
                  dispatch({
                    type : SET_PROJECT_DATA,
                    payload : res[0]
                  })
                }
            })
  }
} 

export const getTask = (projectId) => {
  return function action(dispatch) {
    dispatch({
      type : GET_TASK
    })
    return httpUtils.get(config.endPoints.projectTask + projectId)
                .then(res => {
                  if (res.length) {
                  dispatch({
                    type : SET_TASK,
                    payload : res
                  })
                }
            })
  }
} 

export const getUsers = (projectId) => {
  return function action(dispatch) {
    dispatch({
      type : GET_TASK
    })
    return httpUtils.get(config.endPoints.projectUser + projectId)
                .then(res => {
                  if (res.length) {
                  dispatch({
                    type : SET_PROJECT_USERS,
                    payload : res
                  })

                  dispatch({
                    type : SET_REDIRECT,
                    payload : true
                  })
                }
            })
  }
}

export const getTeamLead = () => {
  return function action(dispatch) {
    dispatch({
      type : GET_TEAM_LEAD
    })
    return httpUtils.get(config.endPoints.userByRole + 'team lead')
            .then(res => {
              if (res.length) {
                  dispatch({
                    type : SET_USERS,
                    payload : res
                  })
              }
            })
  }
} 

export const getEngineer = () => {
  return function action(dispatch) {
    dispatch({
      type : GET_ENGINEER
    })
    return httpUtils.get(config.endPoints.userByRole + 'engineer')
            .then(res => {
              if (res.length) {
                  dispatch({
                    type : SET_USERS,
                    payload : res
                  })
              }
            })
  }
}

export const addUser = (projectId, username) => {
  return function action(dispatch) {
    dispatch({
      type : ADD_USER
    })
    return httpUtils.post(config.endPoints.addUser, {projectId: projectId, username: username})
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

export const removeUser = (projectId, username) => {
  return function action(dispatch) {
    dispatch({
      type : REMOVE_USER
    })

    return httpUtils.post(config.endPoints.removeUser, {projectId: projectId, username: username})
  }
}

