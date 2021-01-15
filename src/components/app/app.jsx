import { useState } from 'react';
import './app.css';
import Main from '../main/main';

const getUUID = () => {
  function s4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const App = () => {
  const [cards, setCards] = useState([
    {
      key: getUUID(),
      photo: 'data:image/png;base64,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',
      name: 'Tester1',
      company: 'Google',
      role: 'Front-end Developer',
      email: 'aaaa@google.com',
      descriptions: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti omnis delectus',
      theme: 'default',
    },

  ]);

  const handleAddBtn = () => {
    console.log('test');
    const newCards = [...cards, {
      key: getUUID(), 
      name: 'New', 
      company: 'Business Card',
      role: 'Role',
      email: 'aaa@aa.com',
      descriptions: 'descriptions...',
      theme: 'default',
    }];
    setCards(newCards);
    
  }
  const handleChangeInput = (property, key, value) => {
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
  
  const handleDeleteCard = (key) => {
    const newCards = cards.filter(card => card.key !== key);
    setCards(newCards);
  }
  return (
    <>
      <div className="background"></div>
      <Main cards={cards} onChangeInput={handleChangeInput} onAddBtn={handleAddBtn} onDeleteCard={handleDeleteCard}/>
    </>
  );
}

export default App;