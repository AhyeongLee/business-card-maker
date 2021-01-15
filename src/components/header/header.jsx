import React, { useRef } from 'react';
import logoImg from './business-cards.png';
import styles from './header.module.css';


const Header = (props) => {
    const addRef = useRef();

    const handleAddBtn = (e) => {
        if (e.target.closest(`#${addRef.current.id}`)) {
            props.onAddBtn();
            setTimeout(() => {
                window.scroll({
                top: document.body.scrollHeight,
                behavior: 'smooth'
              })}, 200);
        }
        
    }
    return (
    <header className={styles.container}>
        <div className={styles.contents}>
            <div ref={addRef} className={styles.add_container}  onClick={handleAddBtn} id="header-add-btn-container">
                <i className={`fas fa-plus ${styles.add_btn}`}></i>
            </div>
            <img className={styles.logo_image} src={logoImg} alt="logo image"/>
            <h1 className={styles.logo_title}>Business Card Maker</h1>
            <div className={styles.logout_container}>
                <a className={styles.logout_btn}>Logout</a>
            </div>
        </div>
    </header>            
)};

export default Header;