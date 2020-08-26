import * as httpUtils from '../utils/http';
import * as config from '../configs/appconfig';

export const GET_TASK_DATA = 'GET_TASK_DATA';
export const SET_TASK_DATA = 'SET_TASK_DATA';
export const GET_TASK_COMMENTS = 'GET_TASK_COMMENTS';
export const SET_TASK_COMMENTS = 'SET_TASK_COMMENTS';
export const GET_TASK_TAGS = 'GET_TASK_TAGS';
export const SET_TASK_TAGS = 'SET_TASK_TAGS';
export const SET_NEW_TAG   = 'SET_NEW_TAG';
export const ADD_TAG = 'ADD_TAG';
export const ADD_TAG_ERROR = 'ADD_TAG_ERROR';
export const REMOVE_TAG = 'REMOVE_TAG';
export const SET_NEW_COMMENT = 'SET_NEW_COMMENT';
export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const setNewComment = (newComment) => {
  return ({
    type : SET_NEW_COMMENT,
    payload : newComment
  })
}

export const addNewComment = (taskId, username, newComment) => {
  return function action(dispatch) {
    dispatch({
      type : ADD_NEW_COMMENT
    })
    return httpUtils.post(config.endPoints.addComment, {taskId, username, comment : newComment})
  }
}

export const setNewTag = (newTag) => {
  return ({
    type : SET_NEW_TAG,
    payload : newTag
  })
}

export const getTaskData = (taskId) => {
  return function action(dispatch) {
    dispatch({
      type : GET_TASK_DATA
    })
    return httpUtils.get(config.endPoints.taskById + taskId)
                .then(res => {
                  if (res.length) {
                  dispatch({
                    type : SET_TASK_DATA,
                    payload : res[0]
                  })
                }
            })
  }
} 

export const getTaskComments = (taskId) => {
  return function action(dispatch) {
    dispatch({
      type : GET_TASK_COMMENTS
    })
    return httpUtils.get(config.endPoints.comments + taskId)
                .then(res => {
                  if (res.length) {
                  dispatch({
                    type : SET_TASK_COMMENTS,
                    payload : res
                  })
                }
            })
  }
}


export const getTaskTags = (taskId) => {
  return function action(dispatch) {
    dispatch({
      type : GET_TASK_TAGS
    })
    return httpUtils.get(config.endPoints.tags + taskId)
                .then(res => {
                  if (res.length) {
                  dispatch({
                    type : SET_TASK_TAGS,
                    payload : res
                  })
                }
            })
  }
}

export const addTag = (projectId, taskId, tag) => {
  return function action(dispatch) {
    dispatch({
      type : ADD_TAG
    })
    return httpUtils.post(config.endPoints.addTag, {taskId : taskId,username : tag, projectId : projectId})
                .then(res => {
                  if (res.status === 400) {
                    dispatch({
                      type : ADD_TAG_ERROR,
                      payload : res.msg
                    })
                } else {
                  dispatch({
                    type : ADD_TAG_ERROR,
                    payload : '',
                  })
                  dispatch({
                    type : SET_NEW_TAG,
                    payload : '',
                  })
                  dispatch(getTaskTags(taskId));
                }
            })
  
  }
}

export const removeTag = (tag, taskId) => {
  return function action(dispatch) {
    dispatch({
      type : REMOVE_TAG
    })
    return httpUtils.post(config.endPoints.removeTag, {taskId : taskId,username : tag})
            }
  
  }


  export const deleteComment = (commentId) => {
    return function action(dispatch) {
      dispatch({
        type : DELETE_COMMENT
      })
      return httpUtils.post(config.endPoints.deleteComment, {commentId})
    }
  } 