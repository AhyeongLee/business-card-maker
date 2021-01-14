import { useState } from 'react';
import './app.css';
import Main from './components/main';

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
      name: 'Tester1',
      company: 'Google',
      role: 'Front-end Developer',
      email: 'aaaa@google.com',
      descriptions: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti omnis delectus',
      theme: 'default',
    },
    {
      key: getUUID(),
      name: 'Tester2',
      company: 'Facebook',
      role: 'Front-end Developer',
      email: 'aaaa@facebook.com',
      descriptions: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti omnis delectus',
      theme: 'black',
    },
  ]);

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
  
  return (
    <>
      <div className="background"></div>
      <Main cards={cards} onChangeInput={handleChangeInput}/>
    </>
  );
}

export default App;
