import * as allUserAction from '../action/allUserAction';

const INITIAL_STATE = {
  users : [],
};

function allUserReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case allUserAction.SET_ALL_USERS:
      return {
        ...state,
        users : action.payload,
      };

    default:
      return state;
  }
}

export default allUserReducer;