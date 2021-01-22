import React, { useRef, memo } from 'react';
import logoImg from '../../images/business-cards.png';
import styles from './header.module.css';


const Header = memo((props) => {
    const addRef = useRef();

    /**
     * @param {event} e 
     * Call onAddBtn() & Scroll to bottom
     */
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
    const handleLogout =() => {
        props.onLogout();
    }
    return (
    <header className={styles.container}>
        <div className={styles.contents}>
            <div ref={addRef} className={styles.add_container}  onClick={handleAddBtn} id="header-add-btn-container">
                <i className={`fas fa-plus ${styles.add_btn}`}></i>
            </div>
            <img className={styles.logo_image} src={logoImg} alt="logo"/>
            <h1 className={styles.logo_title}>Business Card Maker</h1>
            
                <div className={styles.logout_container}>
                    <a className={styles.logout_btn} onClick={handleLogout}>Logout</a>
                </div>
            
        </div>
    </header>            
)});

export default Header;