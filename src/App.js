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

	handleUserInfoChange = newInfo => {
		const user_id = this.state.user.id;
		console.log(newInfo);
		fetch(config.API_ENDPOINT + `/user/${user_id}`, {
			method: 'PATCH',
			body: JSON.stringify(newInfo),
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => {
				if (data.error) {
					this.setState({
						error: data.error
					});
				} else {
					console.log(data);
					this.setState({
						user: {
							full_name: data.full_name,
							user_name: data.user_name,
							photo: data.profile_img_url
						}
					});
				}
			})
			.catch(err =>
				this.setState({
					error: err
				})
			);
	};

	deleteImage = imageId => {
		fetch(config.API_ENDPOINT + `/images/${imageId}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json'
			},
			mode: 'cors'
		});
	};

	updateImage = id => {
		const user_id = this.state.user.id;
		console.log(user_id);
		fetch(config.API_ENDPOINT + `/images/${user_id}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => {
				if (data.error) {
					this.setState({
						error: data.error
					});
				} else {
					console.log(data);
					this.setImages(data);
				}
			})
			.catch(err => {
				console.log(err);
				this.setState({
					error: err
				});
			});

		return <Redirect to={`/user/${user_id}/images/${id}`} />;
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

	refreshState = e => {
		const id = this.state.user.id;
		fetch(config.API_ENDPOINT + `/user/${id}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => {
				if (data.error) {
					this.setState({
						error: data.error
					});
				} else {
					console.log(data);
					this.setState({
						images: data.images,
						albums: data.albums
					});
				}
			})
			.catch(err => {
				console.log(err);
				this.setState({
					error: err
				});
			});
	};

	login = user => {
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
		fetch(config.API_ENDPOINT + `/user/${user.id}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => {
				if (data.error) {
					this.setState({
						error: data.error
					});
				} else {
					console.log(data);
					this.setState({
						images: data.images,
						albums: data.albums
					});
				}
			})
			.catch(err => {
				console.log(err);
				this.setState({
					error: err
				});
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
			refreshState: this.refreshState,
			addAlbum: this.addAlbum,
			deleteAlbum: this.deleteAlbum,
			deleteImage: this.deleteImage,
			updateImage: this.updateImage,
			handleUserInfoChange: this.handleUserInfoChange,
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
