class Auth {
    constructor() {
        this.authenticated = false
    }
    login(ob) {
        this.authenticated = true;
        ob();
    }

    logout(ob) {
        this.authenticated = false;
        ob();
    }
    isAuthenticated() {
        return this.authenticated;
    }
}


export default new Auth();