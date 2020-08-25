import React from 'react';
import './App.css';
import Login from './component/login/';
import Nav from './component/nav/';
import Register from './component/register/';
import AddProject from './component/addProject/';
import AllProject from './component/allProject/';
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
        {/* <Route path="/projects/:id" render={(props) => <Project {...props} />}/>  */}
      </Router>
    </div>
  );
}

export default App;
