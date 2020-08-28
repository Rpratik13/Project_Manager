import * as projectAction from '../action/projectAction';
import * as authAction from '../action/authAction';

const INITIAL_STATE = {
  projectData : [],
  tasks       : [],
  projectUsers       : [],
  users : [],
  addUser: '',
  taggedTasks : [],
  redirect : false,
};

function projectReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case authAction.LOGOUT:
      return { ...INITIAL_STATE }
      
    case projectAction.SET_ADD_USER:
      return {
        ...state,
        addUser : action.payload
      }

    case projectAction.SET_REDIRECT:
      return {
        ...state,
        redirect : action.payload
      }

    case projectAction.SET_PROJECT_DATA:
      return {
        ...state,
        projectData : action.payload,
      };

    case projectAction.SET_TASK:
      return {
        ...state,
        tasks : action.payload,
      };

    case projectAction.SET_USERS:
      return {
        ...state,
        users : [...state.users, ...action.payload],
      };

      
    case projectAction.SET_TAGGED_TASKS:
      return {
        ...state,
        taggedTasks : action.payload
      }

    case projectAction.SET_PROJECT_USERS:
      return {
        ...state,
        projectUsers : action.payload,
      };

    default:
      return state;
  }
}

export default projectReducer;