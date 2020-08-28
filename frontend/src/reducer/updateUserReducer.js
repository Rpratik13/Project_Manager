import * as updateUserAction from '../action/updateUserAction';
import * as authAction from '../action/authAction';


const INITIAL_STATE = {
  username : '',
  password : '',
  role     : 'project manager',
  fname    : '',
  lname    : '',
  error    : '',
  redirectFromUpdate : false,
  oldUsername : '',
  fetchData : true,
};

function updateUserReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case authAction.LOGOUT:
      return {...INITIAL_STATE}
      
    case updateUserAction.SET_OLD_USERNAME:
      return {
        ...state,
        oldUsername : action.payload
      }
    case updateUserAction.SET_USERNAME:
      return {
        ...state,
        username : action.payload,
      };
    
    case updateUserAction.SET_FETCH_DATA:
      return {
        ...state,
        fetchData : action.payload
      }
      
    case updateUserAction.SET_PASSWORD:
      return {
        ...state,
        password : action.payload,
      };

    case updateUserAction.UPDATE_ERROR:
      return {
        ...state,
        error : action.payload,
      };
      
    case updateUserAction.SET_FNAME:
      return {
        ...state,
        fname : action.payload,
      };

    case updateUserAction.SET_LNAME:
      return {
        ...state,
        lname : action.payload,
      };
    
    case updateUserAction.SET_ROLE:
      return {
        ...state,
        role : action.payload,
      };

    case updateUserAction.REDIRECT_FROM_UPDATE:
      return {
        ...state,
        redirectFromUpdate : action.payload,
      };

    default:
      return state;
  }
}


export default updateUserReducer;