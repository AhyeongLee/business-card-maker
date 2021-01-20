import React, { useState } from 'react';
import './app.css';
import Main from '../main/main';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from '../login/login';




const App = ({ loginService, databaseService }) => {
  const [isWaiting, setIsWaiting] = useState(true);

  return (
    <>
    <Router>
        <Switch>
          <Route path="/login">
            <Login loginService={loginService} isWaiting={isWaiting} setIsWaiting={setIsWaiting}/>
          </Route>
          <Route path="/">
            <Main loginService={loginService} databaseService={databaseService} isWaiting={isWaiting} setIsWaiting={setIsWaiting}/>
          </Route>
        </Switch>
      {/* </div> */}
    </Router>
    </>
  );
}

export default App;
