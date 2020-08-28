import * as allProjectAction from '../action/allProjectAction';
import * as authAction from '../action/authAction';


const INITIAL_STATE = {
  projects : [],
};

function allProjectReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case allProjectAction.SET_PROJECTS:
      return {
        ...state,
        projects : action.payload,
      };

    case authAction.LOGOUT:
      return { ...INITIAL_STATE }

    default:
      return state;
  }
}

export default allProjectReducer;