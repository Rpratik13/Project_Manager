import * as myProjectAction from '../action/myProjectAction';

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

    default:
      return state;
  }
}

export default myProjectReducer;