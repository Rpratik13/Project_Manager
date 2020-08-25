import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import addProjectReducer from './addProjectReducer';
import allProjectReducer from './allProjectReducer';

const reducer = combineReducers({
  login : loginReducer,
  register : registerReducer,
  addProject : addProjectReducer,
  allProject: allProjectReducer
});

export default reducer;