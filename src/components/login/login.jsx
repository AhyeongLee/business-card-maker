import React from 'react';
import logoImg from '../images/business-cards.png';
import styles from './login.module.css';
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import 'firebase/auth';
firebase.initializeApp({
    apiKey: "AIzaSyDp281YwcVGxYeRsxG-W9iG__cPsodLGTY",
    authDomain: "business-card-maker-35eba.firebaseapp.com",
    projectId: "business-card-maker-35eba",
    storageBucket: "business-card-maker-35eba.appspot.com",
    messagingSenderId: "642673060672",
    appId: "1:642673060672:web:2d3636e3b2bdd9817028a5"
  });

const Login = (props) => {
    const handleLoginGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(result => {
            const token = result.credential.accessToken;
            const user = result.user;
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credentail = error.credentail;
        });

    }
    return (
    <div className={styles.container}>
        <div className={styles.glass}>
            <div className={styles.logo}>
                <img className={styles.logo_image} src={logoImg} alt="logo image"/>
                <h1 className={styles.logo_title}>Business Card Maker</h1>
            </div>
            <div className={styles.login_btn}>
                <Link to="/">
                    <div className={styles.btn_container} onClick={handleLoginGoogle}>
                        <i className="fab fa-google-plus-g"></i>
                        <div>Google</div>
                    </div>
                </Link>
                <div className={styles.btn_container}>
                    <i className="fab fa-github"></i>
                    <div>Github</div>
                </div>
            </div>
        </div>
    </div> 
            

)};

export default Login;