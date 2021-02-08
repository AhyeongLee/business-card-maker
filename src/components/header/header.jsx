import React, { useRef, memo } from 'react';
import styles from './header.module.css';


const Header = memo(({ onAddBtn, onLogout }) => {
    const addRef = useRef();

    /**
     * @param {event} e 
     * Call onAddBtn() & Scroll to bottom
     */
    const handleAddBtn = (e) => {
        if (e.target.closest(`#${addRef.current.id}`)) {
            onAddBtn();
            setTimeout(() => {
                window.scroll({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            })}, 200);
        }
        
    }
    const handleLogout =() => {
        onLogout();
    }
    return (
    <header className={styles.container}>
        <div className={styles.contents}>
            <div ref={addRef} className={styles.add_container}  onClick={handleAddBtn} id="header-add-btn-container">
                <i className={`fas fa-plus ${styles.add_btn}`}></i>
            </div>
            <img className={styles.logo_image} src="public/images/business-cards.png" alt="logo"/>
            <h1 className={styles.logo_title}>Business Card Maker</h1>
            
                <div className={styles.logout_container}>
                    <a className={styles.logout_btn} onClick={handleLogout}>Logout</a>
                </div>
            
        </div>
    </header>            
)});

export default Header;