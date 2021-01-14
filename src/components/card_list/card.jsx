import React from 'react';
import styles from './card.module.css';
import imgSrc from '../header/business-cards.png';

const Card = ({ card }) => (
    <div className={styles.container}>
        <div className={styles.background}></div>
        <div className={styles.front}>
            <div className={styles.photo_container}>
                <img src={imgSrc} alt="photo" className={styles.photo}/>
            </div>
            <h1 className={styles.name}>{card.name}</h1>
            <p className={styles.role}>{card.role}</p>
            <div className={styles.back}>
                <h1 className={styles.company}>{card.company}</h1>
                <p className={styles.email}>{card.email}</p>
                <p className={styles.descriptions}>{card.descriptions}</p>
            </div>
        </div>
        

    </div>
);

export default Card;