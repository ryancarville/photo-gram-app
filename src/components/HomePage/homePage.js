import React, { Component } from 'react';
import PhotoGramContext from '../../PhotoGramContext';
import config from '../../config';
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
			userPhoto: '',
			images: [],
			albums: [],
			dataReady: false,
			error: null
		};
	}
	static contextType = PhotoGramContext;

	componentDidMount() {
		const user_id = this.props.match.params.user_id;
		fetch(config.API_ENDPOINT + `/users/${user_id}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		}).then(res =>
			res
				.json()
				.then(data => {
					if (data.error) {
						this.setState({
							error: data.error
						});
					} else {
						console.log(data);
						this.setState({
							userId: data.user[0].id,
							userName: data.user[0].full_name,
							userPhoto: data.user[0].profile_img_url,
							images: data.images,
							albums: data.albums,
							dataReady: true
						});
					}
				})
				.catch(err => {
					console.log(err);
					this.setState({
						error: err
					});
				})
		);
	}
	render() {
		const user_id = this.props.match.params.user_id;
		const dataReady =
			this.state.dataReady === true ? (
				<ImageGrid userId={user_id} images={this.state.images} />
			) : (
				<p>Retrieving Images...</p>
			);
		return (
			<div className='homePage'>
				<div className='sideBar'>
					<div className='userInfo'>
						<UserProfileImage
							image={this.state.userPhoto}
							userId={this.state.userId}
						/>
						<p>{this.state.userName}</p>
					</div>
					<div className='content-counter'>
						<div>
							<h4>Images</h4>
							<ImageCount images={this.state.images} />
						</div>
						<div>
							<h4>Albums</h4>
							<AlbumCount albums={this.state.albums} />
						</div>
					</div>
					<div className='albums-container'>
						<h2>Albums</h2>
						<Albums userId={user_id} albums={this.state.albums} />
					</div>
				</div>

				<div className='images-container'>{dataReady}</div>
			</div>
		);
	}
}

export default HomePage;
