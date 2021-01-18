import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import '@fortawesome/fontawesome-free/js/all.js';
import Login from './components/login/login';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

