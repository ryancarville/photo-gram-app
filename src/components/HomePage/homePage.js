import React, { Component } from 'react';
import Albums from '../Albums/albums';
import ImageGrid from '../ImageGrid/imageGrid.js';
import './homePage.css';

class HomePage extends Component {
	render() {
		return (
			<div className='homePage'>
				<div className='content-counter'>
					<div>
						<h4>Images</h4>
						<span>9</span>
					</div>
					<div>
						<h4>Albums</h4>
						<span>4</span>
					</div>
				</div>
				<h2>Albums</h2>
				<Albums />

				<ImageGrid />
			</div>
		);
	}
}

export default HomePage;
