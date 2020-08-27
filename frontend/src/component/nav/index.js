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
           style = {{cursor:"pointer"}} 
           onClick   = {(event) => {
              event.preventDefault();
              document.getElementById("mySidenav").style.width = 0 + 'px'
            }}
        >
          &times;
        </div>
        <span className="nav-text">{window.localStorage.getItem('username')}</span>
        <br/><br/><br/>
        {window.localStorage.getItem('role') === 'admin' && <a href="/dashboard/register">Add User</a>}
        {window.localStorage.getItem('role') === 'admin' && <a href="/dashboard/addProject">Add Project</a>}
        {(window.localStorage.getItem('role') === 'admin' || window.localStorage.getItem('role') === 'project manager' ) && <a href="/dashboard">All Project</a>}
        {(window.localStorage.getItem('role') === 'admin') && <a href="/dashboard/users/all">All Users</a>}
        {(window.localStorage.getItem('role') === 'team lead' || window.localStorage.getItem('role') === 'engineer') && <a href="/dashboard">My Projects</a>}
        <br/><br/><br/>
        <div 
        className="nav-text"
        onClick = { () => {
                window.localStorage.setItem('username', '')
                window.localStorage.setItem('fname', '')
                window.localStorage.setItem('lname', '')
                window.localStorage.setItem('role', '')
                window.localStorage.setItem('token', '')
                window.location.reload(true); 
                }}>Logout</div>
      </div>
      <div 
        style   = {{fontSize: '30px' , cursor : 'pointer'}} 
        onClick = {() => document.getElementById("mySidenav").style.width = "250px"}
        className = 'sidebar-btn'
      >
        &#9776;
      </div>
    </div>
  );
}

export default Nav;