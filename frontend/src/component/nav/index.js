import React from 'react';
import './nav.css';
import { Redirect } from 'react-router-dom';

function Nav () {
  if (!window.localStorage.getItem('username')) {
    return <Redirect to ="/login" />;
  }
  return (
          <div>
            <div id="mySidenav" className="sidenav">
        <div 
           className = "closebtn" 
           onClick   = {(event) => {
              event.preventDefault();
              document.getElementById("mySidenav").style.width = 0 + 'px'
            }}
        >
          &times;
        </div>
        <span>{window.localStorage.getItem('username')}</span>
        {window.localStorage.getItem('role') === 'admin' && <a href="/dashboard/register">Add User</a>}
        {window.localStorage.getItem('role') === 'admin' && <a href="/dashboard/addProject">Add Project</a>}
        {(window.localStorage.getItem('role') === 'admin' || window.localStorage.getItem('role') === 'project manager' ) && <a href="/dashboard/allProjects">All Project</a>}
        <a href="/dashboard/users/all">All Users</a>
        <div onClick = { () => {
                window.localStorage.setItem('username', '')
                window.localStorage.setItem('fname', '')
                window.localStorage.setItem('lname', '')
                window.localStorage.setItem('role', '')
                window.localStorage.setItem('token', '')
                window.location.reload(true); 
                }}>Logout</div>
      </div>
      <span 
        style   = {{fontSize: '30px' , cursor : 'pointer'}} 
        onClick = {() => document.getElementById("mySidenav").style.width = "250px"}
      >
        &#9776;
      </span>
    </div>
  );
}

export default Nav;