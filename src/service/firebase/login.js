import 'firebase/auth';

/**
 * Manage logging in and out
 */
class Login {
    constructor(firebase) {
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

    /**
     * @param {authProvider} provider 
     * 
     * Auth.Persistence.SESSION - Indicates that the state will only persist in the current session or tab,
     * and will be cleared when the tab or window in which the user authenticated is closed. Applies only to web apps.
     * [https://firebase.google.com/docs/auth/web/auth-state-persistence]
     */
    signInWithRedirect = async (provider) => {
        try {
            await this.firebase.auth().setPersistence(this.firebase.auth.Auth.Persistence.SESSION);
            return this.firebase.auth().signInWithRedirect(provider);
        } catch (error) {
            this.errorCode = error.code;
            this.errorMessage = error.message;
        }
    }
    /**
     * @returns {*} result of getRedirectResult()
     * If it is success returns 'Success'
     * If error is occured return error object
     */
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

    /**
     * @param {function} hasSessionFunction 
     * @param {function} hasNoSessionFunction 
     */
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