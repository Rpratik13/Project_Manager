import * as updateTaskAction from '../action/updateTaskAction';

const INITIAL_STATE = {
  taskName : '',
  taskDesc : '',
  taskDeadline : '',
  taskAssignee : '',
  taskAssignees : [],
  updateTaskError  : '',
  updateTaskRedirect : false,
};

function updateTaskReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case updateTaskAction.SET_TASK_NAME:
      return {
        ...state,
        taskName : action.payload,
      };
    
    case updateTaskAction.SET_TASK_DESC:
      return {
        ...state,
        taskDesc : action.payload,
      };

    case updateTaskAction.SET_TASK_DEADLINE:
      return {
        ...state,
        taskDeadline : action.payload,
      };

    case updateTaskAction.SET_TASK_ASSIGNEE:
      return {
        ...state,
        taskAssignee : action.payload,
      };
    
    case updateTaskAction.SET_PROJECT_USERS:
      return {
        ...state,
        taskAssignees : [...state.taskAssignees, ...action.payload],
      };

    case updateTaskAction.UPDATE_TASK_ERROR:
      return {
        ...state,
        updateTaskError : action.payload
      };

    case updateTaskAction.UPDATE_TASK_REDIRECT:
      return {
        ...state,
        updateTaskRedirect : action.payload
      };
      
    default:
      return state;
  }
}

export default updateTaskReducer;