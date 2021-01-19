import firebase from "firebase/app";
import 'firebase/auth';

class Login {
    constructor(config) {
        firebase.initializeApp(config);
        this.token = null;
        this.error = {
            errorCode: null, 
            errorMessage: null, 
            email: null, 
            credentail: null
        };
    }
    signInWithRedirect = async (provider) => {
        try {
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
            return firebase.auth().signInWithRedirect(provider);
        } catch (error) {
            this.errorCode = error.code;
            this.errorMessage = error.message;
        }
    }
    getGoogleWithRedirect = async () => {
        console.log('getGoogleWithRedirect');
        try {
            const result = await firebase.auth().getRedirectResult();
            if (result.credential) {
                this.token = result.credential.accessToken;
            }
        } catch (error) {
            this.error.errorCode = error.code;
            this.error.errorMessage = error.message;
            this.error.email = error.email;
            this.error.credentail = error.credentail;
        }
    }
    logout = async () => {
        try {
            await firebase.auth().signOut();
            this.token = null;
            this.error = {};
        } catch (error) {
            this.errorCode = error.code;
            this.errorMessage = error.message;
        }
    }
    checkSession = (hasSessionFunction, hasNoSessionFunction) => {
        return firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user);
                hasSessionFunction();
            } else {
                console.log('nope');
                hasNoSessionFunction();
            }
        });
    }
}

export default Login;