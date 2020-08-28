import * as myProjectAction from '../action/myProjectAction';
import * as authAction from '../action/authAction';

const INITIAL_STATE = {
  projects : []
};

function myProjectReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case myProjectAction.SET_PROJECT:
      return {
        ...state,
        projects : action.payload
      }

    case authAction.LOGOUT:
      return { ...INITIAL_STATE }

    default:
      return state;
  }
}

export default myProjectReducer;