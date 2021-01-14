import React from 'react';
import Card from './card';
import styles from './card_list.module.css';


const CardList = (props) => (
        <div className={styles.container}>
           <Card/>
       </div>
    );

export default CardList;