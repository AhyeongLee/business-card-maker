import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import '@fortawesome/fontawesome-free/js/all.js';
import LoginService from './service/firebase/login';
import DatabaseService from './service/firebase/database';
import firebase from "firebase/app";
import ImageService from './service/cloudinary/image';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  // storageBucket: ,
};


firebase.initializeApp(config);

const cloudinary_api_key = process.env.REACT_APP_CLOUDINARY_API_KEY;
const cloudinary_api_secret = process.env.REACT_APP_CLOUDINARY_API_SECRET;

const loginService = new LoginService(firebase);
const databaseService = new DatabaseService(firebase);
const imageService = new ImageService(cloudinary_api_key, cloudinary_api_secret);

ReactDOM.render(
  <React.StrictMode>
    <App loginService={loginService} databaseService={databaseService} imageService={imageService}/>
  </React.StrictMode>,
  document.getElementById('root')
);

