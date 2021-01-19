import firebase from "firebase/app";
import 'firebase/auth';

class Login {
    constructor(provider) {
        this.provider = provider;
        this.token = null;
        this.user = null;
        this.error = {
            errorCode: null, 
            errorMessage: null, 
            email: null, 
            credentail: null
        };
    }
    loginGoogleWithRedirect = async () => {
        try {
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
            return firebase.auth().signInWithRedirect(this.provider);
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
            this.user = result.user;
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
            this.user = null;
            this.error = {};
        } catch (error) {
            this.errorCode = error.code;
            this.errorMessage = error.message;
        }
    }
    // isSigned = () => {
    //     return firebase.auth().onAuthStateChanged(user => {
    //         if (user) {
    //             console.log(user);
    //             return user;
    //         } else {
    //             console.log('nope');
    //         }
    //     });
    // }
}

export default Login;