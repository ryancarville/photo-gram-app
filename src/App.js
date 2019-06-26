import React, { Component } from 'react';
import Nav from './components/Nav/nav';
import Routes from './Routes/routes.js';
import PhotGramContext from './PhotoGramContext';
import config from './config';

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
			images: [
				{
					id: 1,
					imgUrl:
						'http://beardystudios.com/ZURICH_SITE/images/photography/earth/sand/06.jpg',
					caption: 'Test caption one for breakfast',
					date: '2019-09-03'
				},
				{
					id: 2,
					imgUrl:
						'http://beardystudios.com/ZURICH_SITE/images/photography/earth/sand/05.jpg',
					caption: 'Test caption two for breakfast',
					date: '2019-25-03'
				},
				{
					id: 3,
					imgUrl:
						'http://beardystudios.com/ZURICH_SITE/images/photography/earth/sand/03.jpg',
					caption: 'Test caption one for breakfast',
					date: '2019-15-04'
				},
				{
					id: 4,
					imgUrl:
						'http://beardystudios.com/ZURICH_SITE/images/photography/earth/sand/01.jpg',
					caption: 'Test caption one for breakfast',
					date: '2019-30-05'
				},
				{
					id: 5,
					imgUrl:
						'http://beardystudios.com/ZURICH_SITE/images/photography/earth/sand/09.jpg',
					caption: 'Test caption one for breakfast',
					date: '2019-10-10'
				},
				{
					id: 6,
					imgUrl:
						'http://beardystudios.com/ZURICH_SITE/images/photography/earth/sand/08.jpg',
					caption: 'Test caption two for breakfast',
					date: '2019-26-11'
				},
				{
					id: 7,
					imgUrl:
						'http://beardystudios.com/ZURICH_SITE/images/photography/earth/sand/04.jpg',
					caption: 'Test caption one for breakfast',
					date: '2019-14-03'
				},
				{
					id: 8,
					imgUrl:
						'http://beardystudios.com/ZURICH_SITE/images/photography/earth/sand/10.jpg',
					caption: 'Test caption one for breakfast',
					date: '2019-31-07'
				},
				{
					id: 9,
					imgUrl:
						'http://beardystudios.com/ZURICH_SITE/images/photography/earth/sand/11.jpg',
					caption: 'Test caption one for breakfast',
					date: '2019-30-05'
				}
			]
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
