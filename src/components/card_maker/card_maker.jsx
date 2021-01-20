import React, { useRef, useState } from 'react';
import Card from '../card/card';
import EditForm from '../editor/edit_form';
import styles from './card_maker.module.css';

const CardMaker = (props) => {
    const deleteRef = useRef();
    const dragZoneRef = useRef();

    const handleChangeInput = (property, value) => {
        props.onChangeInput(property, props.card.key, value);
    }
    const handleDeleteCard = (e) => {
        if (e.target.closest(`#${deleteRef.current.id}`) || e.target === deleteRef.current) {
            props.onDeleteCard(props.card.key);
        }
    }

    const handleDragStart = (e) => {
        
        console.log('dragStart');
        console.log(e.dataTransfer);
        e.dataTransfer.setData('text/plain', e.target.id);
        console.log(e.dataTransfer);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }
    const handleDrop = (e) => {
        e.preventDefault();
        if (!e.target.classList.contains(styles.container)) return;
        
        const data = e.dataTransfer.getData('text/plain');
        e.target.after(document.getElementById(data));
    }
    return (
    <div ref={dragZoneRef} draggable className={styles.container} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop}  id={props.card.key}>
            <div ref={deleteRef} className={styles.delete_container} id="card_maker-delete-btn" onClick={handleDeleteCard} >
                <i className={`fas fa-times ${styles.delete_btn}`}></i>
            </div>
            <Card key="card" card={props.card} onChangeInput={handleChangeInput}/>
            <EditForm key="edit_form" card={props.card} onChangeInput={handleChangeInput}/>
    </div>            
)};

export default CardMaker;