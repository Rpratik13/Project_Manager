import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as projectAction from '../../action/projectAction';


function showTask(task) {
  return (<div style = {{width : '100%', marginBottom : '10px'}}>
           <a href={`/dashboard/task?taskId=${task.task_id}`}>
             <div>
               {task.task_name}
              </div>
            </a>
           <div>
             {task.task_desc}
            </div>
           <div>
             {task.deadline}
            </div>
           <div>
             {task.assignee}
            </div> 
            <br/><br/>
          </div>
 );
}

function createOption(projectUsers, user) {
  let projectUsersArray = []
  projectUsers.forEach(projectUser => {
    projectUsersArray.push(projectUser.username);
  })
  console.log(projectUsersArray);
  if (projectUsersArray.includes(user.username))
    return
  return (<option key={user.username} value={user.username}>{user.username}</option>);
}

function showUser(projectId, user, props) {
 return (<div onClick={() => {
   props.removeUser(projectId, user.username)
    window.location.reload(true)
  }}>{user.username}</div>)
}

function Project (props) {
    let projectId = props.match.params.projectId;
    useEffect(() => {
      props.getEngineer();
      props.getTeamLead();
      props.getProjectData(projectId);
      props.getTask(projectId);
      props.getUsers(projectId);
    }, []);
    console.log(props.projectUsers)
    return (<div className="row">
             <div>
               <a href={`/dashboard/addTask?projectId=${projectId}`}>Add Task</a>
               <a href={`/dashboard/project/update?projectId=${projectId}`}>Update</a>
               <form onSubmit = {(event) => {
                 props.addNewUser(props.projectData.id, props.addUser);
               }}
               >
               <select
              className = "type" 
              id       = "type" 
              name     = "type"
              onChange = {event => { 
                props.setAddUser(event.target.value)
              }}
            >
            <option selected disabled>Choose User</option>
              {props.users.map(user => createOption(props.projectUsers, user))}
            </select>
            <button type="submit">Add User</button>
            </form>
               <div>{props.projectData.id}</div>
               <div>{props.projectData.project_desc}</div>
               <div>{props.projectData.manager_id}</div>
             </div>
             {props.tasks.map(task => showTask(task))}
             {props.projectUsers.map(user => showUser(projectId, user, props))}
          </div>
        );
}

function mapStateToProps (state) {
  return ({
    projectData : state.project.projectData,
    tasks       : state.project.tasks,
    projectUsers : state.project.projectUsers,
    users : state.project.users,
    addUser : state.project.addUser
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);