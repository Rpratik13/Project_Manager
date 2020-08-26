import React from 'react';
import './App.css';
import Login from './component/login/';
import Nav from './component/nav/';
import Register from './component/register/';
import AddProject from './component/addProject/';
import AllProject from './component/allProject/';
import Project    from './component/project';
import AddTask from './component/addTask';
import Task from './component/task';
import AllUser from './component/allUser';
import UserUpdate from './component/userUpdate';
import UpdateProject from './component/updateProject';
import UpdateTask from './component/updateTask';

import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

function App(props) {
  return (
    <div className="App">
      <Router>
        <Route exact path = "/" component = {() => <Redirect to = "/login" />} />
        <Route path="/login" component={() => <Login />} />
        <Route path="/dashboard" component={() => <Nav />} />
        <Route path="/dashboard/register" component={() => <Register/>} />
        <Route path="/dashboard/addProject" component={() => <AddProject />} />
        <Route path="/dashboard/allProjects" component={() => <AllProject />} />
        <Route path="/dashboard/projects/:projectId" render={(props) => <Project {...props} />}/>
        <Route path="/dashboard/project/update" render={(props) => <UpdateProject {...props} />}/>
        <Route path="/dashboard/addTask" render={(props) => <AddTask {...props} />}/> 
        <Route path="/dashboard/task" render={(props) => <Task {...props} />}/> 
        <Route path="/dashboard/users/all" render={(props) => <AllUser {...props} />}/> 
        <Route path="/dashboard/user/:username" render={(props) => <UserUpdate {...props} />}/>
        <Route path="/dashboard/updateTask" render={(props) => <UpdateTask {...props} />}/> 
      </Router>
    </div>
  );
}

export default App;
