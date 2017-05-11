import fetch from 'isomorphic-unfetch';
import decode from 'jwt-decode';

export default class AuthService {
    /**
     * Authentication service for site with useful methds
     * @param {string} domain 
     */
    constructor(domain) {
        this.domain = domain || 'http://localhost:3000';
        this.login = this.login.bind(this);
        this.fetch = this.fetch.bind(this);
        this.loggedIn = this.loggedIn.bind(this);
    }

    /**
     * Login methods if passed sets the jwt token and the profile
     * @param {string} email 
     * @param {string} password 
     * @return {Promise}
     */
    login(email, password) {
        return this.fetch(`${this.domain}/api/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
            this.setToken(res.token);
            return this.fetch(`${this.domain}/api/validate_token`);
        }).then(res => {
            this.setProfile(res.user);
            return Promise.resolve(res);
        });
    }

    async loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token) && this.validateToken(token);;
    }
    /**
     * Helper method for login method to set profile
     * @param {string} profile 
     */
    setProfile(profile) {
        localStorage.setItem('profile', JSON.stringify(profile));
    }

    async validateToken(token) {
        try {
            const data = await fetch(`${this.domain}/api/validate_token`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            const res = await data.json();
            if (res.success) {
                return true
            }
            else {
                return false
            }
        }
        catch(err){
            return false;
        }
    }
    /**
    * Checks for token expiration
    * @param {string} token
    */
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }
    /**
     * Helper method for login method to set jwt_token
     * @param {string} idToken
     */
    setToken(idToken) {
        localStorage.setItem('id_token', idToken);
    }

    /**
     *  Retrieves the user token from localStorage         
     */
    getToken() {
        return localStorage.getItem('id_token');
    }

    /**
     * Retrieves the profile data from localStorage
     * @return {string}
     */
    getProfile() {
        const profile = localStorage.getItem('profile');
        return profile ? JSON.parse(localStorage.profile) : {};
    }

    /**
     *  Clear user token and profile data from localStorage
     */
    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
    }

    /**
     * raises an error in case response status is not a success
     * @param {object} response 
     */
    _checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }

    /**
     * performs api calls sending the required authentication headers
     * @param {string} url 
     * @param {object} options 
     */
    fetch(url, options) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken();
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json());
    }
}