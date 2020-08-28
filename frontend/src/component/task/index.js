import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as taskAction from '../../action/taskAction';

const QS = require('query-string');
  

  function showTag(props, tag, taskId) {
    return (<span 
      className="badge badge-primary mr-1"
      style = {{cursor:"pointer"}}
      onClick={() => {
      props.removeTag(tag.username, taskId)
      window.location.reload(true);
    }}>{tag.username}</span>)
  }

  function showCommentDeleteButton(comment, props) {
    if (comment.username === window.localStorage.getItem('username')) {
      return (<form onSubmit = {(event) => {
      event.preventDefault()
      props.deleteComment(comment.comment_id);
      window.location.reload(true);
    }}>
      <button type = "submit" className="btn btn-danger">Delete</button>
    </form>
      )}}
      
  function showComment(comment, props) {
    return (<div className="list-group-item list-group-item-secondary">
             <div>{comment.comment_text}</div>
             <div>Commented By: {comment.username}</div>
             <div>{comment.date}</div>
             
             {showCommentDeleteButton(comment, props)}
      </div>)
  }

  function showUpdate(props) {
    if ((window.localStorage.getItem('role') === 'engineer' && props.taskData.assignee === window.localStorage.getItem('username')) ||
    (window.localStorage.getItem('role') !== 'engineer'))
      return <a href = {`/dashboard/updateTask?taskId=${props.taskData.task_id}&&projectId=${props.taskData.project_id}`}><button className="btn btn-primary">Update</button></a>
  }

  function showPreviousAssignee(props) {
    if (props.taskData.old_assignee) {
      return <div>Previous Assignee: {props.taskData.old_assignee}</div>
    }
  }  

  function Task (props) {
    let taskId = QS.parse(props.location.search).taskId;
    let {getTaskData, getTaskComments, getTaskTags} = props;
    useEffect(() => {
      getTaskData(taskId);
      getTaskComments(taskId);
      getTaskTags(taskId);
      
    }, [getTaskData, getTaskComments, getTaskTags, taskId]);
  return (<div className="mx-auto" style={{width: "70%", paddingTop: "50px"}}>
            {props.addTagError && <div style={{color : "red"}}>{props.addTagError}</div>}
            <form onSubmit = {event => {
              event.preventDefault();
              props.addTag(props.taskData.project_id, taskId, props.newTag);
            }}>
               <input 
                 type="text"
                 value = {props.newTag}
                 onChange = {(event) => props.setNewTag(event.target.value)}
                 className = "form-control"
                 placeholder = "Tag a user"
               />
            </form>
            {props.tags.map(tag => showTag(props, tag, taskId))}
             <div className = "list-group-item list-group-item-success mt-2 mb-3">
               <div>Task Name: {props.taskData.task_name}</div>
               <div>Description: {props.taskData.task_desc}</div>
               <div>Assigned To: {props.taskData.assignee}</div>
               <div>Deadline: {props.taskData.deadline}</div>
               {showPreviousAssignee(props)}

               {showUpdate(props)}
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
                 className="form-control"
                 placeholder = "Add a comment"
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