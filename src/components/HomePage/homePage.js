import React, { Component } from 'react';
import PhotoGramContext from '../../PhotoGramContext';
// import config from '../../config';
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
			user_id: this.props.match.params.user_id,
			error: null
		};
	}
	static contextType = PhotoGramContext;

	render() {
		const user = this.context.user;
		const content = (
			<div className='homePage'>
				<div className='sideBar'>
					<div className='userInfo'>
						<UserProfileImage image={user.photo} user_id={user.id} />
						<p>{user.name}</p>
					</div>
					<div className='content-counter'>
						<div>
							<h4>Images</h4>
							<ImageCount images={this.context.images} />
						</div>
						<div>
							<h4>Albums</h4>
							<AlbumCount albums={this.context.albums} />
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

		return <div className='homePage'>{content}</div>;
	}
}

export default HomePage;
