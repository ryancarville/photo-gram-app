import React, { Component } from 'react';
import Albums from '../Albums/albums';
import ImageGrid from '../ImageGrid/imageGrid';
import ImageCount from '../ImageCount/imageCount';
import AlbumCount from '../AlbumCount/albumCount';
import './homePage.css';

class HomePage extends Component {
	render() {
		return (
			<div className='homePage'>
				<div className='content-counter'>
					<div>
						<h4>Images</h4>
						<ImageCount />
					</div>
					<div>
						<h4>Albums</h4>
						<AlbumCount />
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
