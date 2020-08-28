import * as httpUtils from '../utils/http';
import * as config from '../configs/appconfig';

export const SET_PROJECT_NAME    = 'SET_PROJECT_NAME';
export const SET_PROJECT_DESC    = 'SET_PROJECT_DESC';
export const SET_PROJECT_MANAGER = 'SET_PROJECT_MANAGER';
export const GET_MANAGERS = 'GET_MANAGERS';
export const SET_MANAGERS = 'SET_MANAGERS';
export const UPDATE_PROJECT_ERROR = 'UPDATE_PROJECT_ERROR';
export const UPDATE_PROJECT_REDIRECT = 'UPDATE_PROJECT_REDIRECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';

export const setProjectName = projectName => ({
  payload : projectName,
  type    : SET_PROJECT_NAME,
});

export const setProjectDesc = projectDesc => ({
  payload : projectDesc,
  type    : SET_PROJECT_DESC,
});

export const setProjectManager = manager => ({
  payload : manager,
  type    : SET_PROJECT_MANAGER
});


export const getManagers = () => {
  return function action(dispatch) {
    dispatch({
      type : GET_MANAGERS
    })
    return httpUtils.get(config.endPoints.userByRole + 'project manager')
            .then(res => {
              if (res.status === 400)  {
                dispatch({
                  type    : UPDATE_PROJECT_ERROR,
                  payload : res.msg
                })
              }
              else if (res.length) {
                  dispatch({
                    type : SET_MANAGERS,
                    payload : res
                  })
              }
            })
  }
} 


export const updateProject = (projectName, projectDesc, projectManager, oldName, oldManager) => {
  return function action(dispatch) {
    dispatch({
      type : UPDATE_PROJECT
    })
    return httpUtils.post(config.endPoints.updateProject, {
                      projectId : projectName,
                      desc : projectDesc,
                      managerId : projectManager,
                      oldId : oldName,
                      oldManager : projectManager !== oldManager? oldManager : ''
                    })
                   .then(res => {
                     if (res.status === 400)  {
                       dispatch({
                          type    : UPDATE_PROJECT_ERROR,
                          payload : res.msg
                       })
                      }
                      else if (res.status === 200) {
                        dispatch({
                          type : UPDATE_PROJECT_REDIRECT,
                          payload : true
                      })
                }
              })
  }
} 

export const getProjectData = (projectId) => {
  return function action(dispatch) {
    dispatch({
      type : GET_MANAGERS
    })
    return httpUtils.get(config.endPoints.projectById + projectId)
            .then(res => {
              if (res.length) {
                  dispatch({
                    type : SET_PROJECT_NAME,
                    payload : res[0].id
                  })
                  dispatch({
                    type : SET_PROJECT_DESC,
                    payload : res[0].project_desc
                  })
                  dispatch({
                    type : SET_PROJECT_MANAGER,
                    payload : res[0].manager_id
                  })
              }
            })
  }
} 



export const deleteProject = (projectName) => {
  return function action(dispatch) {
    dispatch({
      type : DELETE_PROJECT
    })
    return httpUtils.post(config.endPoints.deleteProject, {
                      projectId : projectName,
                    })
                    .then(res => {
                      dispatch({
                        type : UPDATE_PROJECT_REDIRECT,
                        payload : true
                    })
                    })
  }
} 