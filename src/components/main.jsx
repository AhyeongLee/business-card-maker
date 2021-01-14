import React, { useRef } from 'react';
import Header from './header/header';
import CardMaker from './card_maker/card_maker';
import styles from './main.module.css';
import Footer from './footer/footer';


const Main = (props) => {
    const cardMakersRef = useRef();

    const handleChangeInput = (property, key, value) => {
        props.onChangeInput(property, key, value);
    }
    const handleAddBtn = () => {
        
        props.onAddBtn();
        cardMakersRef.current.scrollIntoView({behavior: "smooth", block: "end"});
    }
    return (
    <div className={styles.main}>
        <Header onAddBtn={handleAddBtn}/>
        {/* <MainContent /> */}
        <ul ref={cardMakersRef} className={styles.card_makers}>
            {props.cards.map(card => {
               return ( <CardMaker key={card.key} card={card} onChangeInput={handleChangeInput}/> );
            })}
        </ul>
        
        <Footer />
    </div>            
)};

export default Main;