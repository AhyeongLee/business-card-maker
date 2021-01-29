import React, { useState } from 'react';
import './app.css';
import Main from '../main/main';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from '../login/login';


const App = ({ loginService, databaseService, imageService }) => {
  
  return (
    <>
    <Router>
        <Switch>
          <Route path="/login">
            <Login loginService={loginService} />
          </Route>
          <Route path="/">
            <Main loginService={loginService} databaseService={databaseService} imageService={imageService}/>
          </Route>
        </Switch>
    </Router>
    </>
  );
}

export default App;
