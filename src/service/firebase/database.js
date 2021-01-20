import 'firebase/database';

class Database {
    constructor(firebase) {
        this.firebase = firebase
    }
    writeNewCard = async (userId, card) => {
        card.key = this.firebase.database().ref('/users/' + userId + '/cards/').push().key;
        console.log(card);
        await this.firebase.database().ref('users/' + userId + '/cards/' + card.key).set(card);
    }
    readCards = (userId, setCards) => {
        return this.firebase.database().ref('/users/' + userId)
        .on('value', (snapshot) => {
            const cards = snapshot.val();
            setCards(Object.values(cards.cards));
        });
    }
    updateCard = (userId, property, cardKey, value) => {
        let update;
        switch(property) {
            case 'name': update={name: value}; break;
            case 'company': update={company: value}; break;
            case 'role': update={role: value}; break;
            case 'email': update={email: value}; break;
            case 'descriptions': update={descriptions: value}; break;
            case 'theme': update={theme: value}; break;

        }
        console.log(update);
        console.log(this.firebase.database().ref('/users/' + userId + '/cards/' + cardKey).update(update));
    }
}

export default Database;