import React, { useEffect, useState } from 'react';
import logoImg from '../../images/business-cards.png';
import styles from './login.module.css';
import { Link, useHistory} from "react-router-dom";
import Loading from '../loading/loading';

const Login = (props) => {
    const history = useHistory();

    useEffect(() => {
        props.loginService.getGoogleWithRedirect()
        .then(() => {
            console.log(props.loginService.token);
            if (!props.loginService.token) {
                props.setIsWaiting(false);
                return;
            }
            history.push('/');
        });
    }, []);

    const handleLoginGoogle = (e) => {
        props.setIsWaiting(true);
        props.loginService.loginGoogleWithRedirect()
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
                        <div>Google</div>
                    </div>
                    <div className={styles.btn_container}>
                        <i className="fab fa-github"></i>
                        <div>Github</div>
                    </div>
                </div>
            </div>
        </div> 
    }
    </>

)};

export default Login;