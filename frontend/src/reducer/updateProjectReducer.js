import * as updateProjectAction from '../action/updateProjectAction';

const INITIAL_STATE = {
  updateProjectName : '',
  updateProjectDesc : '',
  updateProjectManager : '',
  projectManagers  : [],
  updateProjectError : '',
  updateProjectRedirect : false,
};

function updateProjectReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case updateProjectAction.SET_PROJECT_NAME:
      return {
        ...state,
        updateProjectName : action.payload,
      };

    case updateProjectAction.SET_PROJECT_DESC:
      return {
        ...state,
        updateProjectDesc : action.payload,
      };

    case updateProjectAction.SET_PROJECT_MANAGER:
      return {
        ...state,
        updateProjectManager : action.payload,
      };
      
    case updateProjectAction.SET_MANAGERS:
      return {
        ...state,
        projectManagers : action.payload,
      };

    case updateProjectAction.UPDATE_PROJECT_ERROR:
      return {
        ...state,
        updateProjectError : action.payload,
      };

    case updateProjectAction.UPDATE_PROJECT_REDIRECT:
      return {
        ...state,
        updateProjectRedirect : action.payload,
      };

    default:
      return state;
  }
}


export default updateProjectReducer;