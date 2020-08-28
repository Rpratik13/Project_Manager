import * as updateProjectAction from '../action/updateProjectAction';
import * as authAction from '../action/authAction';

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
    case authAction.LOGOUT:
      return { ...INITIAL_STATE }
      
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