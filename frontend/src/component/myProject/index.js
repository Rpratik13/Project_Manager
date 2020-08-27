import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as myProjectAction from '../../action/myProjectAction';

function createDiv(project) {
  return (<div style = {{width : '100%', marginBottom : '10px'}} className="list-group-item list-group-item-secondary">
           <a href={`/dashboard/projects/${project.id}`}>Project Name: {project.id}</a>
           <div>
             Description: {project.project_desc}
            </div>
           <div>
             Manager: {project.manager_id}
            </div>
          </div>
 );
}

function MyProject (props) {
    useEffect(() => {
      props.getMyProjects();
    }, []);

    return (<div>
            <h1>Projects</h1>
            {props.projects.map(project => createDiv(project))}
          </div>
        );
}

function mapStateToProps (state) {
  return ({
    projects : state.myProject.projects,
  });
}

function mapDispatchToProps (dispatch) {
  return {
    getMyProjects: () => {
      dispatch(myProjectAction.getMyProjects());
    }    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProject);