import React, { useEffect, useRef, useState } from 'react';
import logoImg from '../../images/business-cards.png';
import styles from './login.module.css';
import { Link, useHistory} from "react-router-dom";
import Loading from '../loading/loading';

const Login = (props) => {
    const [isWaiting, setIsWaiting] = useState(true);
    const history = useHistory();
    const alertRef = useRef();

    const hasSession = () => {
        history.push('/');
    }
    const hasNoSession = () => {
        setIsWaiting(false); 
    }
    useEffect(() => {
        props.loginService.getSignInWithRedirect()
        .then(result => {
            if (result === 'Success') return;
            if (result.errorCode === 'auth/account-exists-with-different-credential') {
                alertRef.current.classList.add(styles.show);    
            }
            
        });
        props.loginService.checkSession(hasSession, hasNoSession);
    }, []);

    const handleLoginGoogle = () => {
        setIsWaiting(true);
        const provider = props.loginService.getGoogleAuthProvider();
        props.loginService.signInWithRedirect(provider)
        .then(() => {
            history.push('/');
        });
    }
    const handleLoginGithub = () => {
        setIsWaiting(true);
        const provider = props.loginService.getGithubAuthProvider();
        props.loginService.signInWithRedirect(provider)
        .then(() => {
            history.push('/');
        });
    }
    const handleClickX = () => {
        alertRef.current.classList.remove(styles.show);
    }
    return (
        <>
        {isWaiting ? 
        <Loading /> :
        <div className={styles.container}>
            <div ref={alertRef} className={styles.alert}>
                <p><strong>알림: </strong>같은 이메일 주소 계정이 이미 존재합니다. 이 이메일 주소와 연결된 제공 업체를 사용하여 로그인 하십시오. </p>
                <span className={styles.x} onClick={handleClickX}>
                    <i className="fas fa-times"></i>
                </span>
            </div>
            <div className={styles.glass}>
                <div className={styles.logo}>
                    <img className={styles.logo_image} src={logoImg} alt="logo image"/>
                    <h1 className={styles.logo_title}>Business Card Maker</h1>
                </div>
                <div className={styles.login_btn}>
                    <div className={styles.btn_container} onClick={handleLoginGoogle}>
                        <div className={styles.icon}>
                            <i className="fab fa-google-plus-g"></i>
                        {/* <div>Sign in with Google</div> */}
                        </div>
                    </div>
                    <div className={styles.btn_container} onClick={handleLoginGithub}>
                        <div className={styles.icon}>
                            <i className="fab fa-github"></i>
                        {/* <div>Sign in with Github</div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    }
    </>

)};

export default Login;