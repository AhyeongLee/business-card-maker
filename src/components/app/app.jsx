import React, { useState } from 'react';
import './app.css';
import Main from '../main/main';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from '../login/login';



const App = ({ loginService }) => {
  const [isWaiting, setIsWaiting] = useState(true);

  return (
    <>
    <Router>
      {/* <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Main</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav> */}

        <Switch>
          <Route path="/login">
            <Login loginService={loginService} isWaiting={isWaiting} setIsWaiting={setIsWaiting}/>
          </Route>
          <Route path="/">
            <Main loginService={loginService} isWaiting={isWaiting} setIsWaiting={setIsWaiting}/>
          </Route>
        </Switch>
      {/* </div> */}
    </Router>
    </>
  );
}

export default App;
