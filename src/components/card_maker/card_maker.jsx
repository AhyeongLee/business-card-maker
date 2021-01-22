import React, { useRef, useState, memo } from 'react';
import Card from '../card/card';
import EditForm from '../editor/edit_form';
import styles from './card_maker.module.css';

const CardMaker = memo((props) => {
    const deleteRef = useRef();

    const handleChangeInput = (property, value) => {
        props.onChangeInput(property, props.card.key, value);
    }
    const handleDeleteCard = (e) => {
        if (e.target.closest(`#${deleteRef.current.id}`) || e.target === deleteRef.current) {
            props.onDeleteCard(props.card.key);
        }
    }
    return (
    <div className={styles.container} id={props.card.key}>
            <div ref={deleteRef} className={styles.delete_container} id="card_maker-delete-btn" onClick={handleDeleteCard} >
                <i className={`fas fa-times ${styles.delete_btn}`}></i>
            </div>
            <Card key="card" card={props.card} onChangeInput={handleChangeInput} imageService={props.imageService}/>
            <EditForm key="edit_form" card={props.card} onChangeInput={handleChangeInput}/>
    </div>            
)});

export default CardMaker;