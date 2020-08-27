import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import addProjectReducer from './addProjectReducer';
import allProjectReducer from './allProjectReducer';
import projectReducer from './projectReducer';
import addTaskReducer from './addTaskReducer'
import taskReducer from './taskReducer'
import allUserReducer from './allUserReducer';
import updateUserReducer from './updateUserReducer';
import updateProjectReducer from './updateProjectReducer';
import updateTaskReducer from './updateTaskReducer';
import myProjectReducer from './myProjectReducer';

const reducer = combineReducers({
  login : loginReducer,
  register : registerReducer,
  addProject : addProjectReducer,
  allProject: allProjectReducer,
  project : projectReducer,
  addTask : addTaskReducer,
  task    : taskReducer,
  allUser : allUserReducer,
  updateUser : updateUserReducer,
  updateProject : updateProjectReducer,
  updateTask : updateTaskReducer,
  myProject : myProjectReducer
});

export default reducer;