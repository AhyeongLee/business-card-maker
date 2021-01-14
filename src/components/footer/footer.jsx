import React, { useRef } from 'react';
import styles from './footer.module.css';
import imgSrc from './add.png';

const Footer = (props) => {
    
    return (
    <footer className={styles.footer}>
        <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </footer>            
)};

export default Footer;