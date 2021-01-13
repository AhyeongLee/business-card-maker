import React from 'react';
import Card from './card';
import styles from './card_list.module.css';


const CardList = (props) => (
        <div className={styles.container}>
           <h1 className={styles.title}>Card Editor</h1>
           <Card/>
       </div>
    );

export default CardList;