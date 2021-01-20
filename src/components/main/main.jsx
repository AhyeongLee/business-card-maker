import React, { useState, useEffect } from 'react';
import Header from '../header/header';
import CardMaker from '../card_maker/card_maker';
import styles from './main.module.css';
import Footer from '../footer/footer';
import { useHistory } from 'react-router-dom';
import loadingImg from '../../images/loading.png';
import Loading from '../loading/loading';


const getUUID = () => {
    function s4() {
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }


const Main = (props) => {

    const [cards, setCards] = useState([]);
    const history = useHistory();
    useEffect(() => {
        console.log('test');
        const user = props.loginService.getCurrentUser();
        console.log(user);
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
              alert('logout');
              history.push('/login');
          });
        
        

    }

    const handleChangeInput = (property, key, value) => {
        props.databaseService.updateCard(props.loginService.getCurrentUser().uid, property, key, value);
        const newCards = [...cards];
        setCards(newCards.map(card => {
        if(card.key === key) {
            const newCard = Object.assign({}, card);
            newCard[property] = value;
            return newCard;
        }
        return card;
        }));
    }
    const handleAddBtn = () => {
        const newCard = {
            // key: getUUID(), 
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
        const newCards = cards.filter(card => card.key !== key);
        setCards(newCards);
    }
    return (
        
        <>
        {props.isWaiting ? 
            <Loading /> : 
            <div className={styles.main}>
                    <Header onAddBtn={handleAddBtn} onLogout={handleLogout}/>
                    {/* <MainContent /> */}
                    <ul className={styles.card_makers}>
                        {cards.map(card => {
                        return ( <CardMaker key={card.key} card={card} onChangeInput={handleChangeInput} onDeleteCard={handleDeleteCard}/> );
                        })}
                    </ul>
                    <Footer />
                
            </div>           
            } 
        </>
)};

export default Main;