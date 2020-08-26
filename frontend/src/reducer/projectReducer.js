import * as projectAction from '../action/projectAction';
import project from '../component/project';

const INITIAL_STATE = {
  projectData : [],
  tasks       : [],
  projectUsers       : [],
  users : [],
  addUser: '',
};

function projectReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case projectAction.SET_ADD_USER:
      return {
        ...state,
        addUser : action.payload
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