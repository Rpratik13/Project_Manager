import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as allProjectAction from '../../action/allProjectAction';


function createDiv(project) {
  return (<div style = {{width : '100%', marginBottom : '10px'}}>
           <div>
             {project.id}
            </div>
           <div>
             {project.project_desc}
            </div>
           <div>
             {project.manager_id}
            </div>
          </div>
 );
}

function AddProject (props) {
    useEffect(() => {
      props.getProjects();
    }, []);

    return (<div className="row">
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

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);