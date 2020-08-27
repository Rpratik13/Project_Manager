import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as allUserAction from '../../action/allUserAction';

function firstUpperCase(val) {
  return val.charAt(0).toUpperCase() + val.slice(1)
}
function createDiv(user) {
  return (<div style = {{width : '100%', marginBottom : '10px'}} className = "list-group-item list-group-item-secondary">
           <a href = {`/dashboard/user/${user.username}`}>
             <div>
               {`${firstUpperCase(user.fname)} ${firstUpperCase(user.lname)}`}
              </div>
            </a>
           <div>
             Username: {user.username}
            </div>
           <div>
             Role: {firstUpperCase(user.role)}
            </div>
          </div>
 );
}

function AllUser (props) {
  console.log(props);
    useEffect(() => {
      props.getAllUsers();
    }, []);

    return (<div>
            <h1>All Users</h1> 
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