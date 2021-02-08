import React, { useCallback } from 'react';
import CardMaker from '../card_maker/card_maker';
import styles from './card_maker_list.module.css';

const CardMakerList = ({ cards, onChangeInput, onDeleteCard, imageService}) => { 
    const handleChangeInput = (property, key, value) => {
        onChangeInput(property, key, value);
    }
    const handleDeleteCard = useCallback((key) => {
        onDeleteCard(key);
    }, [key]);
    return (
    <ul className={styles.container}>
        {cards.map(card => {
            return ( <CardMaker key={card.key} card={card} onChangeInput={handleChangeInput} onDeleteCard={handleDeleteCard} imageService={imageService}/> );
        })}
    </ul>
    )};

export default CardMakerList;