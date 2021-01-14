import React from 'react';
import styles from './footer.module.css';
import imgSrc from './add.png';

const Footer = (props) => (
    <footer className={styles.footer}>
        <div className={styles.add_container}>
            <i className={`fas fa-plus ${styles.add_btn}`}></i>
        </div>
        <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </footer>            
);

export default Footer;