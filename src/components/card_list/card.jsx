import React from 'react';
import styles from './card.module.css';
import imgSrc from '../header/business-cards.png';

const Card = (props) => (
    <div className={styles.container}>
        <div className={styles.front}>
            <div className={styles.photo_container}>
                <img src={imgSrc} alt="photo" className={styles.photo}/>
            </div>
            <h1 className={styles.name}>James Park</h1>
            <p className={styles.role}>Front-end Developer</p>
        </div>
        <div className={styles.back}>
            <h1 className={styles.company}>Facebook</h1>
            <p className={styles.email}>james@facebook.com</p>
            <p className={styles.descriptions}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. consectetur adipisicing elit. </p>
        </div>

    </div>
);

export default Card;