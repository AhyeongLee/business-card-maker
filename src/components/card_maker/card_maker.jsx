import React, { useRef, useState, memo } from 'react';
import Card from '../card/card';
import EditForm from '../editor/edit_form';
import styles from './card_maker.module.css';

const CardMaker = memo(({ onChangeInput, card, onDeleteCard, imageService}) => {
    const deleteRef = useRef();

    const handleChangeInput = (property, value) => {
        onChangeInput(property, card.key, value);
    }
    const handleDeleteCard = (e) => {
        if (e.target.closest(`#${deleteRef.current.id}`) || e.target === deleteRef.current) {
            onDeleteCard(card.key);
        }
    }
    return (
    <div className={styles.container} id={card.key}>
            <div ref={deleteRef} className={styles.delete_container} id="card_maker-delete-btn" onClick={handleDeleteCard} >
                <i className={`fas fa-times ${styles.delete_btn}`}></i>
            </div>
            <Card key="card" card={card} onChangeInput={handleChangeInput} imageService={imageService}/>
            <EditForm key="edit_form" card={card} onChangeInput={handleChangeInput}/>
    </div>            
)});

export default CardMaker;