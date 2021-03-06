import * as updateTaskAction from '../action/updateTaskAction';
import * as authAction from '../action/authAction';

const INITIAL_STATE = {
  taskName : '',
  taskDesc : '',
  taskDeadline : '',
  taskAssignee : '',
  taskAssignees : [],
  updateTaskError  : '',
  updateTaskRedirect : false,
  projectData : [],
  oldTaskAssignee : '',
  previousAssignee : '',
};

function updateTaskReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case authAction.LOGOUT:
      return {...INITIAL_STATE}
      
    case updateTaskAction.SET_PREVIOUS_ASSIGNEE:
      return {
        ...state,
        previousAssignee: action.payload
      }
    case updateTaskAction.SET_TASK_OLD_ASSIGNEE:
      return {
        ...state,
        oldTaskAssignee : action.payload
      }
    case updateTaskAction.SET_PROJECT_DATA:
      return {
        ...state,
        projectData : action.payload
      }
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