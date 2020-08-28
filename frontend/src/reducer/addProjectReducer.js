import * as addProjectAction from '../action/addProjectAction';
import * as authAction from '../action/authAction';

const INITIAL_STATE = {
  addProjectName : '',
  addProjectDesc : '',
  addProjectManager : '',
  projectManagers  : [],
  addProjectError : '',
  addProjectRedirect : false,
};

function addProjectReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case authAction.LOGOUT:
      return { ...INITIAL_STATE }
      
    case addProjectAction.SET_PROJECT_NAME:
      return {
        ...state,
        addProjectName : action.payload,
      };

    case addProjectAction.SET_PROJECT_DESC:
      return {
        ...state,
        addProjectDesc : action.payload,
      };

    case addProjectAction.SET_PROJECT_MANAGER:
      return {
        ...state,
        addProjectManager : action.payload,
      };
      
    case addProjectAction.SET_MANAGERS:
      return {
        ...state,
        projectManagers : action.payload,
      };

    case addProjectAction.ADD_PROJECT_ERROR:
      return {
        ...state,
        addProjectError : action.payload,
      };

    case addProjectAction.ADD_PROJECT_REDIRECT:
      return {
        ...state,
        addProjectRedirect : action.payload,
      };

    default:
      return state;
  }
}


export default addProjectReducer;