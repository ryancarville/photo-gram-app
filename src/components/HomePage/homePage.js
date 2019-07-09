import React, { Component } from 'react';
import PhotoGramContext from '../../PhotoGramContext';
import UserProfileImage from '../UserProfileImage/userProfileImage.js';
import Albums from '../Albums/albums';
import ImageGrid from '../ImageGrid/imageGrid';
import ImageCount from '../ImageCount/imageCount';
import AlbumCount from '../AlbumCount/albumCount';
import './homePage.css';

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: '',
			userName: '',
			userPhoto: ''
		};
	}
	static contextType = PhotoGramContext;

	render() {
		return (
			<div className='homePage'>
				<div className='sideBar'>
					<div className='userInfo'>
						<UserProfileImage
							image={this.context.state.userPhoto}
							userId={this.context.state.userId}
						/>
						<p>{this.context.state.userName}</p>
					</div>
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
					<ImageGrid userId={this.state.userId} />
				</div>
			</div>
		);
	}
}

export default HomePage;
