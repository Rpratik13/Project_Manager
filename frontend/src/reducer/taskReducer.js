import * as taskAction from '../action/taskAction';

const INITIAL_STATE = {
  taskData : [],
  comments : [],
  tags     : [],
  newTag   : '',
  addTagError : '',
  newComment : '',
};

function taskReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case taskAction.SET_TASK_DATA:
      return {
        ...state,
        taskData : action.payload,
      };

    case taskAction.SET_TASK_COMMENTS:
      return {
        ...state,
        comments : action.payload,
      };

    case taskAction.SET_TASK_TAGS:
      return {
        ...state,
        tags : action.payload,
      };

    case taskAction.SET_NEW_TAG:
      return {
        ...state,
        newTag : action.payload
      }
    
    case taskAction.ADD_TAG_ERROR:
      return {
        ...state,
        addTagError : action.payload
      }

    case taskAction.SET_NEW_COMMENT:
      return {
        ...state,
        newComment : action.payload
      }

    default:
      return state;
  }
}

export default taskReducer;