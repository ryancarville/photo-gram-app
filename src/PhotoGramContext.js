import React from 'react';

const PhotGramContext = React.createContext({
	signUp: () => {},
	getUserData: () => {},
	checkIfLoggedIn: () => {},
	logout: () => {},
	goHome: () => {},
	getImageData: () => {},
	getAlbumData: () => {},
	handleUserInfoChange: () => {},
	refreshState: () => {},
	deleteImage: () => {},
	addAlbum: () => {},
	deletAlbum: () => {},
	setAppStateUser: () => {},
	setAppStateImages: () => {},
	setAppStateAlbums: () => {},
	user: {},
	state: {},
	images: [],
	albums: []
});

export default PhotGramContext;
