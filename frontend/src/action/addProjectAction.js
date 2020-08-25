export const SET_PROJECT_NAME    = 'SET_PROJECT_NAME';
export const SET_PROJECT_DESC    = 'SET_PROJECT_DESC';
export const SET_PROJECT_MANAGER = 'SET_PROJECT_MANAGER';
export const GET_MANAGERS = 'GET_MANAGERS';
export const SET_MANAGERS = 'SET_MANAGERS';
export const ADD_PROJECT_ERROR = 'ADD_PROJECT_ERROR';
export const ADD_PROJECT_REDIRECT = 'ADD_PROJECT_REDIRECT';
export const ADD_PROJECT = 'ADD_PROJECT';

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
    return fetch('http://localhost:5000/api/users/role/project manager', {
      method : 'GET',
      headers : {
        'authentication' : window.localStorage.getItem('token')
      }
    })
            .then(res => res.json())
            .then(res => {
              if (res.status === 400)  {
                dispatch({
                  type    : ADD_PROJECT_ERROR,
                  payload : res.msg
                })
              }
              else if (res.length) {
                if (res.length) {
                  dispatch({
                    type : SET_MANAGERS,
                    payload : res
                  })
                }
              }
            })
            .catch(err => console.log(err));
  }
} 


export const addProject = (projectName, projectDesc, projectManager) => {
  return function action(dispatch) {
    dispatch({
      type : ADD_PROJECT
    })
    return fetch('http://localhost:5000/api/project/create', {
                  method  : 'POST',
                  headers : {
                    'authentication' : window.localStorage.getItem('token'),
                    'content-type': 'application/json'
                  },
                  body : JSON.stringify({
                    projectId : projectName,
                    desc : projectDesc,
                    managerId : projectManager
                  })
                })
                .then(res => res.json())
                .then(res => {
              if (res.status === 400)  {
                dispatch({
                  type    : ADD_PROJECT_ERROR,
                  payload : res.msg
                })
              }
              else if (res.status === 200) {
                  dispatch({
                    type : ADD_PROJECT_REDIRECT,
                    payload : true
                  })
                }
              })
            .catch(err => console.log(err));
  }
} 