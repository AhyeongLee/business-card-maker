import React, { useRef, memo } from 'react';
import styles from './footer.module.css';
import imgSrc from '../../images/add.png';

const Footer = memo((props) => {
    
    return (
    <footer className={styles.footer}>
        <div className={styles.my_info}>Ahyeong Lee</div>
        <p>
            Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>
            <br/>from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
        </p>
    </footer>            
)});

export default Footer;