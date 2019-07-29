import config from '../config';

const TokenService = {
	//save jwt to session storage
	saveAuthToken(token) {
		window.sessionStorage.setItem(config.TOKEN_KEY, token);
	},
	//get jwt from session storage
	getAuthToken() {
		return window.sessionStorage.getItem(config.TOKEN_KEY);
	},
	//remove jwt from session storage
	clearAuthToken() {
		window.sessionStorage.removeItem(config.TOKEN_KEY);
	}
};

export default TokenService;
