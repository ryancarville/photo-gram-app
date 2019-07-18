import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import config from './config.js';
import Nav from './components/Nav/nav';
import Routes from './Routes/routes.js';
import PhotoGramContext from './PhotoGramContext';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				id: null,
				name: '',
				email: '',
				user_name: '',
				photo: '',
				date_created: ''
			},
			images: [],
			albums: [],
			singUp: false,
			loggedIn: false,
			error: null
		};
	}
	static contextType = PhotoGramContext;

	signUp = newUser => {
		console.log(newUser);
		fetch(config.API_ENDPOINT + '/signup', {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'content-type': 'application/json'
			},
			mode: 'cors'
		}).then(res =>
			res
				.json()
				.then(data => {
					if (data.error) {
						console.log(data.error);
						this.setState({ error: data.error });
					} else {
						this.setState({
							signUp: true
						});
					}
				})
				.catch(err => {
					console.log(err);
					this.setState({
						error: err
					});
				})
		);
	};

	login = user => {
		console.log(user);
		this.setState({
			user: {
				id: user.id,
				name: user.name,
				user_name: user.user_name,
				email: user.email,
				photo: user.photo,
				date_created: user.date_created
			},
			loggedIn: true
		});
	};

	logout = () => {
		window.sessionStorage.removeItem(config.TOKEN_KEY);
		this.setState({
			loggedIn: false,
			signUp: false
		});
	};

	goBack = e => {
		this.props.history.goBack();
	};

	setImages = images => {
		this.setState({
			images: images
		});
	};

	setAlbums = albums => {
		this.setState({
			albums: albums
		});
	};
	handleProfileImageChange = profileImage => {
		this.setState({
			user_photo: profileImage
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

	updateImage = imageToUpdate => {
		const images = this.state.images;
		this.setState({
			images: images.filter(img =>
				img.id === imageToUpdate.id ? imageToUpdate : img
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

	render() {
		if (this.state.signup) {
			return <Redirect to={`/login`} />;
		}
		const contextValue = {
			user: this.state.user,
			setImages: this.setImages,
			setAlbums: this.setAlbums,
			images: this.state.images,
			albums: this.state.albums,
			uploadImage: this.uploadImage,
			addAlbum: this.addAlbum,
			deleteAlbum: this.deleteAlbum,
			deleteImage: this.deleteImage,
			updateImage: this.updateImage,
			handleProfileImageChange: this.handleProfileImageChange,
			login: this.login,
			logout: this.logout,
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
