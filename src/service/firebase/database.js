import 'firebase/database';

class Database {
    constructor(firebase) {
        this.firebase = firebase
    }
    writeNewCard = async (userId, card) => {
        const cardListRef = this.firebase.database().ref('/users/' + userId + '/cards/');
        const newCardRef = cardListRef.push();
        card.key = newCardRef.key;
        console.log(card);
        await newCardRef.set(card);
    }
    removeCard = async (userId, cardKey) => {
        const cardToRemove = this.firebase.database().ref('/users/' + userId + '/cards/' + cardKey);
        await cardToRemove.remove();
    }
    readCards = (userId, setCards) => {
        return this.firebase.database().ref('/users/' + userId)
        .on('value', (snapshot) => {
            const cards = snapshot.val();
            if (cards) {
                setCards(Object.values(cards.cards));
            } else {
                setCards([]);
            }
        });
    }
    updateCard = (userId, property, cardKey, value) => {
        let update;
        switch(property) {
            case 'photo': update={photo: value}; break;
            case 'name': update={name: value}; break;
            case 'company': update={company: value}; break;
            case 'role': update={role: value}; break;
            case 'email': update={email: value}; break;
            case 'descriptions': update={descriptions: value}; break;
            case 'theme': update={theme: value}; break;

        }
        console.log(update);
        this.firebase.database().ref('/users/' + userId + '/cards/' + cardKey).update(update);
    }
}

export default Database;