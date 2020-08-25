import * as loginAction from '../action/loginAction';


const INITIAL_STATE = {
  loginUsername : '',
  loginPassword : '',
  loginError    : '',
  redirectLogin : false,
};

function loginReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case loginAction.SET_USERNAME:
      return {
        ...state,
        loginUsername : action.payload,
      };

    case loginAction.SET_PASSWORD:
      return {
        ...state,
        loginPassword : action.payload,
      };

    case loginAction.LOGIN_ERROR:
      return {
        ...state,
        loginError : action.payload,
      };

    case loginAction.LOGIN_REDIRECT:
      return {
        ...state,
        redirectLogin : action.payload,
      };

    default:
      return state;
  }
}


export default loginReducer;