import React, { Component } from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import Routes from './Routes/routes.js';
import PhotoGramContext from './PhotoGramContext';
import PhotoGramApiService from './services/photoGram-api-service';
import TokenService from './services/token-service';
import './App.css';

class App extends Component {
	//shared app state
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
	//context type
	static contextType = PhotoGramContext;
	//handle logout event
	logout = () => {
		TokenService.clearAuthToken();
		this.setState({
			loggedIn: false,
			signUp: false
		});
		return <Redirect to='/' />;
	};
	//get all data for selected image
	getImageData = imageId => {
		const images = this.state.images;
		const image = images.filter(img => img.id.toString() === imageId);
		return image[0];
	};
	//get all images assinged to selected album
	getAlbumData = album_id => {
		const albums = this.state.albums;
		const album = albums.filter(alb => alb.id.toString() === album_id);
		return album[0];
	};
	//push home path to url callback
	goHome = e => {
		const user_id = this.state.user.id;
		window.history.pushState('goHome', null, `/user/${user_id}`);
	};
	//handle user info change event
	handleUserInfoChange = newInfo => {
		const userId = this.state.user.id;
		PhotoGramApiService.updateUserInfo(userId, newInfo)
			.then(data => {
				if (data.error) {
					console.log(data.error);
					this.setState({
						error: data.error
					});
				} else {
					this.setState({
						user: {
							full_name: data.full_name,
							user_name: data.user_name,
							photo: data.profile_img_url
						}
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
	//checks if user sessionStorage has a jwt
	checkIfLoggedIn = () => {
		if (TokenService.getAuthToken()) {
			let user = {};
			user.id = this.props.match.params.user_id;
			PhotoGramApiService.login(user)
				.then(data => {
					if (data.error) {
						this.setState({
							error: data.error
						});
					} else {
						this.setState({
							images: data.images,
							albums: data.albums,
							loggedIn: true
						});
					}
				})
				.catch(err => {
					console.log(err);
					this.setState({ error: err });
				});
		} else {
			return <Redirect to={'/login'} />;
		}
	};
	//gets all data for logged in user
	getUserData = user => {
		PhotoGramApiService.getUserData(user)
			.then(data => {
				this.setState(
					{
						images: data.images,
						albums: data.albums
					},
					() => {
						console.log(this.state);
					}
				);
			})
			.then(
				this.setState({
					user: {
						id: user.id,
						name: user.name,
						user_name: user.user_name,
						email: user.email,
						photo:
							user.photo ||
							'https://res.cloudinary.com/rcarville/image/upload/v1564425749/photoGram_profileImage/ozgynn2ehowpitzn8axf.png',
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
	//handles signup event
	signUp = newUser => {
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
	//sets shared state with user data on change
	setAppStateUser = user => {
		this.setState({
			user: {
				id: user.id,
				name: user.full_name,
				user_name: user.user_name,
				email: user.email,
				photo: user.profile_img_url,
				date_created: user.date_created
			}
		});
	};
	//sets shared state with addtion of a new image
	setAppStateImages = image => {
		this.setState({
			images: [...this.state.images, image]
		});
	};
	//sets shared state with additon of a new album
	setAppStateAlbums = album => {
		this.setState({
			albums: [...this.state.albums, album]
		});
	};
	//updates shared state on image data change
	updateImage = newImageInfo => {
		const images = this.state.images;
		this.setState({
			images: images.map(img =>
				img.id.toString() !== newImageInfo.id ? img : newImageInfo
			)
		});
	};
	//updates shared state on deletetion of image
	updateImagesOnDelete = imageId => {
		const images = this.state.images;
		const updatedImages = images.filter(img => img.id.toString() !== imageId);
		this.setState({
			images: updatedImages
		});
	};
	//updates shared state on deletion of a album
	updateAlbumsOnDelete = albumId => {
		const albums = this.state.albums;
		const updatedAlbums = albums.filter(
			album => album.id.toString() !== albumId
		);
		this.setState({ albums: updatedAlbums });
	};

	render() {
		//redirect if signUp event successful
		if (this.state.signup === true) {
			return <Redirect to={`/login`} />;
		}

		//set context values
		const contextValue = {
			signUp: this.signUp,
			logout: this.logout,
			goHome: this.goHome,
			user: this.state.user,
			images: this.state.images,
			albums: this.state.albums,
			getImageData: this.getImageData,
			getAlbumData: this.getAlbumData,
			handleUserInfoChange: this.handleUserInfoChange,
			getUserData: this.getUserData,
			checkIfLoggedIn: this.checkIfLoggedIn,
			state: this.state,
			setAppStateUser: this.setAppStateUser,
			setAppStateImages: this.setAppStateImages,
			setAppStateAlbums: this.setAppStateAlbums,
			updateImage: this.updateImage,
			updateImagesOnDelete: this.updateImagesOnDelete,
			updateAlbumsOnDelete: this.updateAlbumsOnDelete
		};

		return (
			<main className='App'>
				<BrowserRouter>
					<PhotoGramContext.Provider value={contextValue}>
						<Routes />
					</PhotoGramContext.Provider>
				</BrowserRouter>
			</main>
		);
	}
}
export default App;
