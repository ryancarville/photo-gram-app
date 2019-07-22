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
		return (
			<PhotoGramContext.Consumer>
				{context => (
					<div className='homePage'>
						<div className='homePage'>
							<div className='sideBar'>
								<div className='userInfo'>
									<UserProfileImage
										image={context.user.photo}
										user_id={context.user.id}
									/>
									<p>{context.user.name}</p>
								</div>
								<div className='content-counter'>
									<div>
										<h4>Images</h4>
										<ImageCount images={context.images} />
									</div>
									<div>
										<h4>Albums</h4>
										<AlbumCount albums={context.albums} />
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
					</div>
				)}
			</PhotoGramContext.Consumer>
		);
	}
}

export default HomePage;
