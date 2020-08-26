import * as addTaskAction from '../action/addTaskAction';

const INITIAL_STATE = {
  taskName : '',
  taskDesc : '',
  taskDeadline : '',
  taskAssignee : '',
  taskAssignees : [],
  addTaskError  : '',
  addTaskRedirect : false,
};

function addTaskReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case addTaskAction.SET_TASK_NAME:
      return {
        ...state,
        taskName : action.payload,
      };
    
    case addTaskAction.SET_TASK_DESC:
      return {
        ...state,
        taskDesc : action.payload,
      };

    case addTaskAction.SET_TASK_DEADLINE:
      return {
        ...state,
        taskDeadline : action.payload,
      };

    case addTaskAction.SET_TASK_ASSIGNEE:
      return {
        ...state,
        taskAssignee : action.payload,
      };
    
    case addTaskAction.SET_PROJECT_USERS:
      return {
        ...state,
        taskAssignees : [...state.taskAssignees, ...action.payload],
      };

    case addTaskAction.ADD_TASK_ERROR:
      return {
        ...state,
        addTaskError : action.payload
      };

    case addTaskAction.ADD_TASK_REDIRECT:
      return {
        ...state,
        addTaskRedirect : action.payload
      };
      
    default:
      return state;
  }
}

export default addTaskReducer;