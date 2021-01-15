import React, { useState } from 'react';
import Card from '../card_list/card';
import EditForm from '../editor/edit_form';
import styles from './card_maker.module.css';

const CardMaker = (props) => {
    const handleChangeInput = (property, value) => {
        props.onChangeInput(property, props.card.key, value);
    }
    return (
    <div className={styles.container}>
            <Card key="card" card={props.card}/>
            <EditForm key="edit_form" card={props.card} onChangeInput={handleChangeInput}/>
    </div>            
)};

export default CardMaker;