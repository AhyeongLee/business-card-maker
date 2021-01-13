import React from 'react';
import logoImg from './business-cards.png';
import styles from './header.module.css';


const Header = (props) => (
    <header className={styles.container}>
        <img className={styles.logo_image} src={logoImg} alt="logo image"/>
        <h1 className={styles.logo_title}>Business Card Maker</h1>
        <div className={styles.btn}>
            <a className={styles.logout_btn}>Logout</a>
        </div>
        
    </header>            
);

export default Header;