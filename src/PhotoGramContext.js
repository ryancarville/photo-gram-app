import React from 'react';

const PhotGramContext = React.createContext({
	signUp: () => {},
	login: () => {},
	logout: () => {},
	goBack: () => {},
	setImages: () => {},
	setAlbums: () => {},
	handleUserInfoChange: () => {},
	refreshState: () => {},
	deleteImage: () => {},
	updateImage: () => {},
	addAlbum: () => {},
	deletAlbum: () => {},
	user: {},
	state: {},
	images: [],
	albums: []
});

export default PhotGramContext;
