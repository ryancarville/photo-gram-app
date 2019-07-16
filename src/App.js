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
			userId: '',
			userName: '',
			userPhoto: '',
			users: [],
			images: [],
			albums: [],
			singUp: false,
			validLogin: false,
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

	login = userId => {
		console.log(userId);
		this.setState({
			userId: userId,
			validLogin: true
		});
		console.log(this.state);
	};

	logout = () => {
		window.sessionStorage.removeItem(config.TOKEN_KEY);
		this.setState({
			validLogin: false,
			signUp: false
		});
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

	render() {
		if (this.state.signup) {
			return <Redirect to={`/login`} />;
		}
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
