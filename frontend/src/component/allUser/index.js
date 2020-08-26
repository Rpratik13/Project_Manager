import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as allUserAction from '../../action/allUserAction';


function createDiv(user) {
  return (<div style = {{width : '100%', marginBottom : '10px'}}>
           <a href = {`/dashboard/user/${user.username}`}>
             <div>
               {`${user.fname} ${user.lname}`}
              </div>
            </a>
           <div>
             {user.username}
            </div>
           <div>
             {user.role}
            </div>
          </div>
 );
}

function AllUser (props) {
    useEffect(() => {
      props.getAllUsers();
    }, []);

    return (<div className="row">
            {props.users.map(user => createDiv(user))}
          </div>
        );
}

function mapStateToProps (state) {
  return ({
    users : state.allUser.users,
  });
}

function mapDispatchToProps (dispatch) {
  return {
    getAllUsers: () => {
      dispatch(allUserAction.getAllUsers());
    }    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUser);