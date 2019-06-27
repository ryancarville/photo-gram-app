import React, { Component } from 'react';
import Nav from './components/Nav/nav';
import Routes from './Routes/routes.js';
import PhotGramContext from './PhotoGramContext';
import STORE from './STORE/store.js';
//import config from './config';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			error: null
		};
	}

	signUp = e => {};

	login = e => {};

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
	};

	updateImage = updatedImage => {
		this.setState({
			images: this.state.images.map(img =>
				img.id !== updatedImage.id ? img : updatedImage
			)
		});
	};

	componentDidMount() {
		this.setState({
			images: STORE
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
			uploadImage: this.uploadImage,
			deleteImage: this.deleteImage,
			updateImage: this.updateImage,
			login: this.login,
			signUp: this.signUp
		};

		return (
			<main className='App'>
				<PhotGramContext.Provider value={contextValue}>
					<Nav />
					<Routes />
				</PhotGramContext.Provider>
			</main>
		);
	}
}
export default App;
