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
	setAppStateUser: () => {},
	setAppStateImages: () => {},
	setAppStateAlbums: () => {},
	setImageId: () => {},
	updateImage: () => {},
	updateImagesOnDelete: () => {},
	updateAlbumsOnDelete: () => {},
	user: {},
	state: {},
	images: [],
	albums: []
});

export default PhotGramContext;
