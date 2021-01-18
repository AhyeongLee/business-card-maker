import React from 'react';
import './app.css';
import Main from '../main/main';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from '../login/login';



const App = () => {
  
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
            <Login />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      {/* </div> */}
    </Router>
    </>
  );
}

export default App;
