import React, { Component } from 'react';
import Nav from './components/Nav/nav';
import Routes from './Routes/routes.js';
import PhotoGramContext from './PhotoGramContext';
//import config from './config';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			albums: [],
			validLogin: false,
			error: null
		};
	}

	signUp = e => {};

	login = e => {
		this.setState({
			validLogin: true
		});
		console.log(this.state);
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
	static contextType = PhotoGramContext;
	componentDidMount() {
		this.setState({
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
			images: this.state.images,
			albums: this.state.albums,
			uploadImage: this.uploadImage,
			deleteImage: this.deleteImage,
			updateImage: this.updateImage,
			login: this.login,
			signUp: this.signUp,
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
