import React from 'react';
import logoImg from './tmpLogo.png';
import styles from './header.module.css';


const Header = (props) => (
    <header className={styles.container}>
        <img className={styles.logo_image} src={logoImg} alt="logo image"/>
        <h1 className={styles.logo_title}>Business Card Maker</h1>
        <button className={styles.logout_btn}>Logout</button>
    </header>            
);

export default Header;