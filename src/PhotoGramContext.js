import React from 'react';

const PhotGramContext = React.createContext({
	signUp: () => {},
	login: () => {},
	logout: () => {},
	goBack: () => {},
	setImages: () => {},
	setAlbums: () => {},
	handleProfileImageChange: () => {},
	uploadImage: () => {},
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
