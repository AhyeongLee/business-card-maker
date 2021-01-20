import React, { useEffect, useState } from 'react';
import logoImg from '../../images/business-cards.png';
import styles from './login.module.css';
import { Link, useHistory} from "react-router-dom";
import Loading from '../loading/loading';

const Login = (props) => {
    const history = useHistory();

    const hasSession = () => {
        history.push('/');
    }
    const hasNoSession = () => {
        props.setIsWaiting(false); 
    }
    useEffect(() => {
        props.loginService.checkSession(hasSession, hasNoSession);
    }, []);

    const handleLoginGoogle = () => {
        props.setIsWaiting(true);
        const provider = props.loginService.getGoogleAuthProvider();
        props.loginService.signInWithRedirect(provider)
        .then(() => {
            history.push('/');
        });
    }
    const handleLoginGithub = () => {
        props.setIsWaiting(true);
        const provider = props.loginService.getGithubAuthProvider();
        props.loginService.signInWithRedirect(provider)
        .then(() => {
            history.push('/');
        });
    }
    return (
        <>
        {props.isWaiting ? 
        <Loading /> :
        <div className={styles.container}>
            <div className={styles.glass}>
                <div className={styles.logo}>
                    <img className={styles.logo_image} src={logoImg} alt="logo image"/>
                    <h1 className={styles.logo_title}>Business Card Maker</h1>
                </div>
                <div className={styles.login_btn}>
                    <div className={styles.btn_container} onClick={handleLoginGoogle}>
                        <i className="fab fa-google-plus-g"></i>
                        <div>Sign in with Google</div>
                    </div>
                    <div className={styles.btn_container} onClick={handleLoginGithub}>
                        <i className="fab fa-github"></i>
                        <div>Sign in with Github</div>
                    </div>
                </div>
            </div>
        </div> 
    }
    </>

)};

export default Login;