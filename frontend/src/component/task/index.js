import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as taskAction from '../../action/taskAction';

const QS = require('query-string');
  

  function showTag(props, tag, taskId) {
    return (<div onClick={() => {
      props.removeTag(tag.username, taskId)
      window.location.reload(true);
    }}>{tag.username}</div>)
  }

  function showComment(comment, props) {
    return (<div>
             <div>{comment.username}</div>
             <div>{comment.comment_text}</div>
             <div>{comment.date}</div>
             <form onSubmit = {(event) => {
               event.preventDefault()
               props.deleteComment(comment.comment_id);
               window.location.reload(true);
             }}>
               <button type = "submit"></button>
             </form>
      </div>)
  }

  function Task (props) {
    let taskId = QS.parse(props.location.search).taskId;
    useEffect(() => {
      props.getTaskData(taskId);
      props.getTaskComments(taskId);
      props.getTaskTags(taskId);
    }, []);
  
  return (<div className="row">
            {props.addTagError && <div>{props.addTagError}</div>}
            <form onSubmit = {event => {
              event.preventDefault();
              props.addTag(props.taskData.project_id, taskId, props.newTag);
            }}>
               <input 
                 type="text"
                 value = {props.newTag}
                 onChange = {(event) => props.setNewTag(event.target.value)}
               />
            </form>
            {props.tags.map(tag => showTag(props, tag, taskId))}
             <div>
               <div>{props.taskData.task_name}</div>
               <div>{props.taskData.task_desc}</div>
               <div>{props.taskData.assignee}</div>
               <div>{props.taskData.deadline}</div>
               <a href = {`/dashboard/updateTask?taskId=${props.taskData.task_id}&&projectId=${props.taskData.project_id}`}>Update</a>
             </div>
             <form onSubmit = {event => {
              event.preventDefault();
              props.addNewComment(taskId, window.localStorage.getItem('username'), props.newComment);
              window.location.reload(true);
            }}>
               <input 
                 type="text"
                 value = {props.newComment}
                 onChange = {(event) => props.setNewComment(event.target.value)}
               />
            </form>
            {props.comments.map(comment => showComment(comment, props))}
          </div>
        );
}

function mapStateToProps (state) {
  return ({
    taskData : state.task.taskData,
    comments       : state.task.comments,
    tags : state.task.tags,
    newTag : state.task.newTag,
    addTagError : state.task.addTagError,
    newComment : state.task.newComment
  });
}

function mapDispatchToProps (dispatch) {
  return {
    getTaskData: (taskId) => {
      dispatch(taskAction.getTaskData(taskId))
    },
    
    getTaskComments : (taskId) => {
      dispatch(taskAction.getTaskComments(taskId))
    },
    
    getTaskTags : (taskId) => {
      dispatch(taskAction.getTaskTags(taskId))
    },

    setNewTag : (newTag) => {
      dispatch(taskAction.setNewTag(newTag))
    },

    addTag : (projectId, taskId, tag) => {
      dispatch(taskAction.addTag(projectId, taskId, tag))
    },

    removeTag : (username, taskId) => {
      dispatch(taskAction.removeTag(username, taskId))
    },

    setNewComment : (newComment) => {
      dispatch(taskAction.setNewComment(newComment))
    },

    addNewComment : (taskId, username, newComment) => {
      dispatch(taskAction.addNewComment(taskId, username, newComment))
    },

    deleteComment : (commentId) => {
      dispatch(taskAction.deleteComment(commentId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);