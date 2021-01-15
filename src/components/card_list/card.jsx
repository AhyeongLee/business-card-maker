import React, { useRef } from 'react';
import styles from './card.module.css';
import imgSrc from '../header/business-cards.png';

const Card = ({ card }) => {
    const frontRef = useRef();

    const handleClickCard = (e) => {
        console.log(e.target);
        if (e.target.closest(`#${frontRef.current.id}`)) {
            console.log(frontRef.current.id);
            frontRef.current.classList.toggle(styles.flipped);
        }
    }

    return (
    <div className={styles.container} id={styles[card.theme]}>
        <div className={styles.background}></div>
        <div ref={frontRef} className={styles.front} id="flip" onClick={handleClickCard} >
            <div className={styles.photo_container}>
                <img src={imgSrc} alt="photo" className={styles.photo}/>
            </div>
            <h1 className={styles.name}>{card.name}</h1>
            <p className={styles.company}>{card.company}</p>
            <div className={styles.back}>
            
                <h1 className={styles.role}>{card.role}</h1>
                <p className={styles.email}>{card.email}</p>
                <p className={styles.descriptions}>{card.descriptions}</p>
            </div>
        </div>
        

    </div>
)};

export default Card;