import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Nav from './components/Nav/nav';
import Routes from './Routes/routes.js';
import PhotoGramContext from './PhotoGramContext';
import PhotoGramApiService from './services/photoGram-api-service';
import TokenService from './services/token-service';
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

	logout = () => {
		TokenService.clearAuthToken();
		this.setState({
			loggedIn: false,
			signUp: false
		});
	};

	getImageData = imageId => {
		const images = this.state.images;
		const image = images.filter(img => img.id.toString() === imageId);
		return image[0];
	};

	getAlbumData = album_id => {
		const albums = this.state.albums;
		const album = albums.filter(alb => alb.id.toString() === album_id);
		console.log(album[0]);
		return album[0];
	};

	goHome = e => {
		const user_id = this.state.user.id;
		window.history.pushState('goHome', null, `/user/${user_id}`);
	};

	refreshContent = e => {
		console.log('refresh state ran');
		const id = this.state.user.id;
		PhotoGramApiService.refreshContent(id)
			.then(data => {
				console.log(data);
				this.setState({
					images: data.images,
					albums: data.albums
				});
			})
			.then(rd => {
				console.log(this.props.history);
				return this.props.history.push(`/user/${id}`);
			})
			.catch(err => {
				console.log(err);
				this.setState({
					error: err
				});
			});
	};

	deleteAlbum = albumId => {
		PhotoGramApiService.deletAlbum(albumId).then(this.refreshContent);
	};

	deleteImage = imageId => {
		PhotoGramApiService.deleteImage(imageId).then(this.refreshContent);
	};

	handleUserInfoChange = newInfo => {
		const userId = this.state.user.id;
		console.log(newInfo);
		PhotoGramApiService.updateUserInfo(userId, newInfo)
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

	checkIfLoggedIn = () => {
		if (TokenService.getAuthToken()) {
			let user = {};
			user.id = this.props.match.params.user_id;
			console.log(user.id);
			PhotoGramApiService.login(user)
				.then(data => {
					if (data.error) {
						this.setState({
							error: data.error
						});
					} else {
						console.log(data);
						this.setState({
							images: data.images,
							albums: data.albums,
							loggedIn: true
						});
					}
				})
				.catch(err => {
					this.setState({ error: err });
				});
		} else {
			return <Redirect to={'/login'} />;
		}
	};

	getUserData = user => {
		PhotoGramApiService.getUserData(user)
			.then(data => {
				console.log(data);
				this.setState({
					images: data.images,
					albums: data.albums
				});
			})
			.then(
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
				})
			)
			.catch(err => {
				console.log(err);
				this.setState({
					error: err
				});
			});
	};

	signUp = newUser => {
		console.log(newUser);
		PhotoGramApiService.signUp(newUser)
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
			});
	};

	setAppStateUser = user => {
		console.log(user);
		this.setState(
			{
				user: {
					id: user.id,
					name: user.full_name,
					user_name: user.user_name,
					email: user.email,
					photo: user.profile_img_url,
					date_created: user.date_created
				}
			},
			() => {
				console.log(this.state);
			}
		);
	};

	setAppStateImages = image => {
		this.setState({
			images: [...this.state.images, image]
		});
	};

	setAppStateAlbums = album => {
		this.setState({
			albums: [...this.state.albums, album]
		});
	};

	updateAlbumsOnDelete = albumId => {
		const albums = this.state.albums;
		const updatedAlbums = albums.filter(album => album.id !== albumId);
		this.setState({ albums: updatedAlbums });
	};

	render() {
		if (this.state.signup === true) {
			return <Redirect to={`/login`} />;
		}
		const contextValue = {
			user: this.state.user,
			images: this.state.images,
			albums: this.state.albums,
			refreshState: this.refreshState,
			getImageData: this.getImageData,
			getAlbumData: this.getAlbumData,
			addAlbum: this.addAlbum,
			deleteAlbum: this.deleteAlbum,
			deleteImage: this.deleteImage,
			handleUserInfoChange: this.handleUserInfoChange,
			getUserData: this.getUserData,
			checkIfLoggedIn: this.checkIfLoggedIn,
			logout: this.logout,
			signUp: this.signUp,
			goHome: this.goHome,
			state: this.state,
			setAppStateUser: this.setAppStateUser,
			setAppStateImages: this.setAppStateImages,
			setAppStateAlbums: this.setAppStateAlbums,
			updateAlbumsOnDelete: this.updateAlbumsOnDelete
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
export default withRouter(App);
