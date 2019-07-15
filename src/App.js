import React, { Component } from 'react';
import config from './config.js';
import Nav from './components/Nav/nav';
import Routes from './Routes/routes.js';
import PhotoGramContext from './PhotoGramContext';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: '',
			userName: '',
			userPhoto: '',
			users: [],
			images: [],
			albums: [],
			signUp: false,
			validLogin: false,
			error: null
		};
	}
	static contextType = PhotoGramContext;

	signUp = e => {
		this.setState({ signUp: true });
		alert('New User account created!  Please login.');
	};

	login = userId => {
		console.log(userId);
		const user = this.state.users.filter(usr => usr.id === userId);
		this.setState({
			userId: userId,
			userName: user[0].name,
			userPhoto: user[0].photo,
			validLogin: true
		});
		console.log(this.state);
	};

	goBack = e => {
		this.props.history.goBack();
	};

	handleProfileImageChange = profileImage => {
		this.setState({
			userPhoto: profileImage
		});
	};

	setImages = images => {
		this.setState({
			images: images,
			error: null
		});
	};

	uploadImage = img => {
		this.setState({
			images: [...this.state.images, img]
		});
	};

	deleteImage = imageId => {
		const newImages = this.state.images.filter(img => img.id !== imageId);
		this.setState({
			images: newImages
		});
		console.log(this.state.images);
	};

	updateImage = updatedImage => {
		this.setState({
			images: this.state.images.map(img =>
				img.id !== updatedImage.id ? img : updatedImage
			)
		});
	};

	addAlbum = album => {
		this.setState({
			albums: [...this.state.albums, album]
		});
	};

	deleteAlbum = albumId => {
		const newAlbums = this.state.albums.filter(alb => alb.id !== albumId);
		this.setState({
			albums: newAlbums
		});
	};

	componentDidMount() {
		this.setState({
			users: this.context.users,
			images: this.context.images,
			albums: this.context.albums
		});

		// fetch(config.API_ENDPOINT, {
		// 	method: 'GET',
		// 	header: {
		// 		'content-type': 'application/json'
		// 	}
		// })
		// 	.then(res => {
		// 		if (!res.ok) {
		// 			return res.json().then(error => Promise.reject(error));
		// 		}
		// 		return res.json();
		// 	})
		// 	.then(this.setImages)
		// 	.catch(error => {
		// 		console.log(error);
		// 		this.setState({ error });
		// 	});
	}
	render() {
		const contextValue = {
			users: this.state.users,
			handleProfileImageChange: this.handleProfileImageChange,
			images: this.state.images,
			albums: this.state.albums,
			addAlbum: this.addAlbum,
			deleteAlbum: this.deleteAlbum,
			uploadImage: this.uploadImage,
			deleteImage: this.deleteImage,
			updateImage: this.updateImage,
			login: this.login,
			signUp: this.signUp,
			goBack: this.goBack,
			state: this.state
		};

		return (
			<main className='App'>
				<PhotoGramContext.Provider value={contextValue}>
					<Nav />
					<Routes />
				</PhotoGramContext.Provider>
			</main>
		);
	}
}
export default App;
