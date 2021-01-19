import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import '@fortawesome/fontawesome-free/js/all.js';
import LoginService from './service/firebase/login';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};


const loginService = new LoginService(config);

ReactDOM.render(
  <React.StrictMode>
    <App loginService={loginService}/>
  </React.StrictMode>,
  document.getElementById('root')
);

