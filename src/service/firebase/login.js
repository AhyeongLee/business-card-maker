import 'firebase/auth';

class Login {
    constructor(firebase) {
        // firebase.initializeApp(config);
        this.firebase = firebase;
        this.token = null;
        this.user = null;
        this.error = {
            errorCode: null, 
            errorMessage: null, 
            email: null, 
            credentail: null
        };
    }
    signInWithRedirect = async (provider) => {
        try {
            await this.firebase.auth().setPersistence(this.firebase.auth.Auth.Persistence.SESSION);
            return this.firebase.auth().signInWithRedirect(provider);
        } catch (error) {
            this.errorCode = error.code;
            this.errorMessage = error.message;
        }
    }
    getSignInWithRedirect = async () => {
        try {
            const result = await this.firebase.auth().getRedirectResult();
            if (result.credential) {
                this.token = result.credential.accessToken;
            }
            this.user = result.user;
            return 'Success';
        } catch (error) {
            this.error.errorCode = error.code;
            this.error.errorMessage = error.message;
            this.error.email = error.email;
            this.error.credentail = error.credentail;
            return this.error;
        }
    }
    getCurrentUser = () => {
        return this.firebase.auth().currentUser;
    }
    logout = async () => {
        try {
            await this.firebase.auth().signOut();
            this.token = null;
            this.user = null;
            this.error = {};
        } catch (error) {
            this.errorCode = error.code;
            this.errorMessage = error.message;
        }
    }
    checkSession = async (hasSessionFunction, hasNoSessionFunction) => {
        await this.firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.user = user;
                hasSessionFunction();
            } else {
                this.user = null;
                hasNoSessionFunction();
            }
        });
    }
    getGithubAuthProvider = () => {return new this.firebase.auth.GithubAuthProvider()}
    getGoogleAuthProvider = () => {return new this.firebase.auth.GoogleAuthProvider()}
}

export default Login;