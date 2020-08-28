import * as allUserAction from '../action/allUserAction';
import * as authAction from '../action/authAction';

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

    case authAction.LOGOUT:
      return { ...INITIAL_STATE }

    default:
      return state;
  }
}

export default allUserReducer;