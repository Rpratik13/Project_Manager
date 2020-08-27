import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as allProjectAction from '../../action/allProjectAction';
import { Redirect } from 'react-router-dom';

function showProjectTitle(project) {
  if (project.manager_id === window.localStorage.getItem('username') || window.localStorage.getItem('role') === 'admin') {
    return (<a href = {`/dashboard/projects/${project.id}`}>
              <div>Project Title: {project.id}</div>
            </a>)
  }
  return <div>Project Title: {project.id}</div>
}

function createDiv(project) {
  return (<div style = {{width : '100%', marginBottom : '10px'}} className = "list-group-item list-group-item-secondary">
           {showProjectTitle(project)}
           <div>
             Description: {project.project_desc}
            </div>
           <div>
             Manager: {project.manager_id}
            </div>
          </div>
 );
}

function AllProject (props) {
    useEffect(() => {
      props.getProjects();
    }, []);
    let userRole = window.localStorage.getItem('role');
    if (userRole !== 'admin' && userRole !== 'project manager'){
      return <Redirect to ="/"/>
    }

    return (<div>
            <h1>All Projects</h1>
            {props.projects.map(project => createDiv(project))}
          </div>
        );
}

function mapStateToProps (state) {
  return ({
    projects : state.allProject.projects,
  });
}

function mapDispatchToProps (dispatch) {
  return {
    getProjects: () => {
      dispatch(allProjectAction.getProjects());
    }    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProject);