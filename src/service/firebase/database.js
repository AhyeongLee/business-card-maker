import 'firebase/database';

/**
 * Write, Read, Update and Delete data by Firebase realtime database api
 */
class Database {
    constructor(firebase) {
        this.firebase = firebase
    }
    /**
     * 
     * @param {String} userId 
     * @param {String} card - card object with no key
     * Write data and Set the key value that Firebase automatically generates
     */
    writeNewCard = async (userId, card) => {
        const cardListRef = this.firebase.database().ref('/users/' + userId + '/cards/');
        const newCardRef = cardListRef.push();
        card.key = newCardRef.key;
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
    /**
     * @param {String} userId - id of user currently logged in
     * @param {String} property - property of card object for change its value
     * @param {String} cardKey - key of card
     * @param {String} value - value to change
     */
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
        this.firebase.database().ref('/users/' + userId + '/cards/' + cardKey).update(update);
    }
}

export default Database;