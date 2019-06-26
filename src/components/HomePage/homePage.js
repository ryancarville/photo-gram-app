import React, { Component } from 'react';
import Albums from '../Albums/albums';
import ImageGrid from '../ImageGrid/imageGrid.js';
import './homePage.css';

class HomePage extends Component {
	render() {
		return (
			<>
				<Albums />
				<ImageGrid />
			</>
		);
	}
}

export default HomePage;
