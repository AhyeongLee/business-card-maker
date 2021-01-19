import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import '@fortawesome/fontawesome-free/js/all.js';
import LoginService from './service/firebase/login';
import firebase from "firebase/app";
import 'firebase/auth';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
});
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const loginService = new LoginService(googleAuthProvider);

ReactDOM.render(
  <React.StrictMode>
    <App loginService={loginService}/>
  </React.StrictMode>,
  document.getElementById('root')
);

