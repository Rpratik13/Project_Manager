import * as registerAction from '../action/registerAction';
import * as authAction from '../action/authAction';

const INITIAL_STATE = {
  registerUsername : '',
  registerPassword : '',
  registerRole     : 'project manager',
  registerFname    : '',
  registerLname    : '',
  registerError    : '',
  redirectFromRegister : false,
};

function registerReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case authAction.LOGOUT:
      return { ...INITIAL_STATE }
      
    case registerAction.SET_USERNAME:
      return {
        ...state,
        registerUsername : action.payload,
      };

    case registerAction.SET_PASSWORD:
      return {
        ...state,
        registerPassword : action.payload,
      };

    case registerAction.REGISTER_ERROR:
      return {
        ...state,
        registerError : action.payload,
      };
      
    case registerAction.SET_FNAME:
      return {
        ...state,
        registerFname : action.payload,
      };

    case registerAction.SET_LNAME:
      return {
        ...state,
        registerLname : action.payload,
      };
    
    case registerAction.SET_ROLE:
      return {
        ...state,
        registerRole : action.payload,
      };

    case registerAction.REDIRECT:
      return {
        ...state,
        redirectFromRegister : action.payload,
      };

    default:
      return state;
  }
}


export default registerReducer;