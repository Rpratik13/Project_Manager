import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as projectAction from '../../action/projectAction';
import { Redirect } from 'react-router-dom';


function showTask(props, task) {
  return (<div style = {{width : '100%', margin : '10px 0px 0px 10px'}} className = "list-group-item list-group-item-secondary">
           <a href={`/dashboard/task?taskId=${task.task_id}`}>
             <div>
               Task Name: {task.task_name}
              </div>
            </a>
           <div>
             Description: {task.task_desc}
            </div>
           <div>
             Deadline: {task.deadline.slice(0, 10)}
            </div>
           <div>
             Assigned To: {task.assignee}
            </div> 
            {showPreviousAssignee(task)}
            {showTagged(props, task.task_id)}
          </div>
 );
}

function createOption(projectUsers, user) {
  let projectUsersArray = []
  projectUsers.forEach(projectUser => {
    projectUsersArray.push(projectUser.username);
  })
  if (projectUsersArray.includes(user.username))
    return
  return (<option key={user.username} value={user.username}>{user.username}</option>);
}

function showRemove(projectId, user, props) {
  let userRole = window.localStorage.getItem('role');
  if (userRole === 'admin' || userRole === 'project manager') {
    return <div style={{float : "right", cursor:"pointer"}} onClick={() => {
      props.removeUser(projectId, user.username)
       window.location.reload(true)
     }}>Remove</div>
  }
}
function showUser(projectId, user, props) {
 return (<div  className="list-group-item list-group-item-secondary" style={{margin: '10px 10px 0px 0px'}}>
    {showRemove(projectId, user, props)}
    <div>{user.username}</div>
    <div>{user.role}</div>
    </div>)
}

function showUpdateProject(projectId) {
  let userRole = window.localStorage.getItem('role');
  if (userRole === 'admin' || userRole === 'project manager') {
    return <a href={`/dashboard/project/update?projectId=${projectId}`}><button className="btn btn-primary">Update</button></a>
  }
}

function showAddUser(props) {
  let userRole = window.localStorage.getItem('role');
  if (userRole === 'admin' || userRole === 'project manager')
   return (<form onSubmit = {(event) => {
                 props.addNewUser(props.projectData.id, props.addUser);
               }}
               style = {{marginTop : "10px"}}
               >
               <select
              className = "form-control" 
              id       = "type" 
              name     = "type"
              onChange = {event => { 
                props.setAddUser(event.target.value)
              }}
            >
            <option selected disabled>Choose User</option>
              {props.users.map(user => createOption(props.projectUsers, user))}
            </select>
            <button type="submit" className="btn btn-primary mt-2">Add User</button>
            </form>);
}

function showAddTask(projectId) {
  if (window.localStorage.getItem('role') !== 'engineer') {
    return <a href={`/dashboard/addTask?projectId=${projectId}`} style={{marginRight: "10px"}}><button className="btn btn-primary">Add Task</button></a>
  }
}

function showTagged(props, taskId) {
  let taskIds = []
  props.taggedTasks.forEach(task => taskIds.push(task.task_id))
  console.log(taskIds);
  if (taskIds.includes(taskId)){
    return <span>tagged</span>
  }
}

function showPreviousAssignee(task) {
  if (task.old_assignee) {
    return <div>Previous Assignee: {task.old_assignee}</div>
  }
}  

function Project (props) {
    let projectId = props.match.params.projectId;
    useEffect(() => {
      props.getEngineer();
      props.getTeamLead();
      props.getProjectData(projectId);
      props.getTask(projectId);
      props.getUsers(projectId);
      props.getTaggedTasks(window.localStorage.getItem('username'));
    }, []);
    let projectUsernames = [];
    props.projectUsers.forEach(user => projectUsernames.push(user.username));
    if (props.redirect && window.localStorage.getItem('role') !== 'admin' && props.projectData.manager_id !== window.localStorage.getItem('username') && !projectUsernames.includes(window.localStorage.getItem('username')) 
         ) {
          return <Redirect to = "/" />
        }
    return (<div>
             <div>
               <div className = "list-group-item list-group-item-success clearfix">
                 <div style = {{float : "left", marginLeft:"45%", marginTop:"20px"}}>
               <div>Project Name: {props.projectData.id}</div>
               <div>Description: {props.projectData.project_desc}</div>
               <div>Manager: {props.projectData.manager_id}</div>
               </div>
               <div style={{float: "right"}}>
               {showAddTask(projectId)}
               {showUpdateProject(projectId)}
               {showAddUser(props)}
               </div>
               </div>
             </div>
             <div style = {{float : "left", width: "50%"}}>
               <span className="text-black" style={{fontWeight: "bold"}}>Tasks</span>
             {props.tasks.map(task => showTask(props, task))}
             </div>
             <div style={{float:"right", width: "40%"}}>
             <span className="text-black" style={{fontWeight: "bold"}}>Users</span>
               {props.projectUsers.map(user => showUser(projectId, user, props))}
             </div>
          </div>
        );
}

function mapStateToProps (state) {
  return ({
    projectData : state.project.projectData,
    tasks       : state.project.tasks,
    projectUsers : state.project.projectUsers,
    users : state.project.users,
    addUser : state.project.addUser,
    taggedTasks : state.project.taggedTasks,
    redirect : state.project.redirect
  });
}

function mapDispatchToProps (dispatch) {
  return {    
    getProjectData: (projectId) => {
      dispatch(projectAction.getProjectData(projectId))
    },
    
    getTask : (projectId) => {
      dispatch(projectAction.getTask(projectId))
    },

    getEngineer : () => {
      dispatch(projectAction.getEngineer())
    },

    getTeamLead : () => {
      dispatch(projectAction.getTeamLead())
    },

    addNewUser : (projectId, username) => {
      dispatch(projectAction.addUser(projectId, username))
    },

    setAddUser : (username) => {
      dispatch(projectAction.setAddUser(username));
    },

    getUsers : (projectId) => {
      dispatch(projectAction.getUsers(projectId));
    },

    removeUser : (projectId, username) => {
      dispatch(projectAction.removeUser(projectId, username));
    },

    getTaggedTasks : (username) => {
      dispatch(projectAction.getTaggedTasks(username));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);