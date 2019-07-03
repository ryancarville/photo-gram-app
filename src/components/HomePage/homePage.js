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
				<div className='sideBar'>
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
					<div className='albums-container'>
						<h2>Albums</h2>
						<Albums />
					</div>
				</div>

				<div className='images-container'>
					<ImageGrid />
				</div>
			</div>
		);
	}
}

export default HomePage;
