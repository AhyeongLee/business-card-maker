import React, { useRef, useState } from 'react';
import Card from '../card_list/card';
import EditForm from '../editor/edit_form';
import styles from './card_maker.module.css';

const CardMaker = (props) => {
    const deleteRef = useRef();
    const dropZoneRef = useRef();

    const handleChangeInput = (property, value) => {
        props.onChangeInput(property, props.card.key, value);
    }
    const handleDeleteCard = (e) => {
        if (e.target.closest(`#${deleteRef.current.id}`) || e.target === deleteRef.current) {
            props.onDeleteCard(props.card.key);
        }
    }

    const handleDropFile = (e) => {
        console.log(e);
    }
    return (
    <div ref={dropZoneRef} className={styles.container}>
            <div ref={deleteRef} className={styles.delete_container} id="card_maker-delete-btn" onClick={handleDeleteCard} id="card_maker-delete-btn-container">
                <i className={`fas fa-times ${styles.delete_btn}`}></i>
            </div>
            <Card key="card" card={props.card} onChangeInput={handleChangeInput}/>
            <EditForm key="edit_form" card={props.card} onChangeInput={handleChangeInput}/>
    </div>            
)};

export default CardMaker;