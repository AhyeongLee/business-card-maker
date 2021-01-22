import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../header/header';
import CardMaker from '../card_maker/card_maker';
import Footer from '../footer/footer';
import Loading from '../loading/loading';
import styles from './main.module.css';
import CardMakerList from '../card_maker_list/card_maker_list';


const Main = (props) => {
    const [cards, setCards] = useState([]);
    const history = useHistory();
    useEffect(() => {
        const user = props.loginService.getCurrentUser();
        if (user) {
            props.setIsWaiting(false);
            props.databaseService.readCards(user.uid, setCards);
        } else {
            history.push('/login');
        }
        
    }, []);

    const handleLogout = () => {
        props.setIsWaiting(true);
        props.loginService.logout()
          .then(() => {
              history.push('/login');
          });
    }

    const handleChangeInput = (property, key, value) => {
        props.databaseService.updateCard(props.loginService.getCurrentUser().uid, property, key, value);
        const newCards = cards.map(card => {
            if (card.key == key) {
                switch(property) {
                    case 'photo': return { ...card, photo: value};
                    case 'name': return { ...card, name: value};
                    case 'company': return { ...card, company: value};
                    case 'role': return { ...card, role: value};
                    case 'email': return { ...card, email: value};
                    case 'descriptions': return { ...card, descriptions: value};
                    case 'theme': return { ...card, theme: value};
        
                }
            }
            return card;
        });
        setCards(newCards);
    }
    const handleAddBtn = () => {
        const newCard = {
            photo: '',
            name: 'Gildong Hong', 
            company: 'Notte',
            role: 'Document Generator',
            email: 'aaa@notte.com',
            descriptions: 'descriptions...',
            theme: 'default',
          };
        props.databaseService.writeNewCard(props.loginService.user.uid, newCard)
        .then(() => {
            const newCards = [...cards, newCard];
            setCards(newCards);
        });
            

    }

    const handleDeleteCard = (key) => {
        props.databaseService.removeCard(props.loginService.user.uid, key)
        .then(() => {
            const newCards = cards.filter(card => card.key !== key);
            setCards(newCards);
        });
        
    }
    return (
        <>
        {props.isWaiting ? 
            <Loading /> : 
            <div className={styles.main}>
                    <Header onAddBtn={handleAddBtn} onLogout={handleLogout}/>
                    <CardMakerList cards={cards} onChangeInput={handleChangeInput} onDeleteCard={handleDeleteCard} imageService={props.imageService}/>
                    <Footer />
                
            </div>           
            } 
        </>
)};

export default Main;