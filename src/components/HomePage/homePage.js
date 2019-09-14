import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
import Loading from '../Loading/loading';
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
		this.getData = () => {
			const user = { id: this.state.user_id };
			this.context.checkIfLoggedIn(user);
		};
	}
	//set context for componet
	static contextType = PhotoGramContext;
	//on mount check if user has a valid JWT
	componentDidMount() {
		this.getData();
	}
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
										user_name={context.user.name}
									/>
									<p>{context.user.name}</p>
								</div>
								<div className='content-counter'>
									<div>
										<h4>Images</h4>
										{context.images === undefined ? (
											<Loading />
										) : (
											<ImageCount />
										)}
									</div>
									<div>
										<h4>Albums</h4>
										{context.albums === undefined ? (
											<Loading />
										) : (
											<AlbumCount />
										)}
									</div>
								</div>
								<div className='albums-container'>
									<div id='albumTag'>
										<Link
											to={`/user/${context.user.id}/addAlbum`}
											id='addAlbum'>
											<img
												src='https://beardystudios.com/Bloc_Capstone/photoGram/images/profileChangeBtn.png'
												alt='add album button'
												id='addAlbumBtn'
											/>
										</Link>
										<h2>Albums</h2>
									</div>
									{context.albums === undefined ? <Loading /> : <Albums />}
								</div>
							</div>

							<div className='images-container'>
								{context.images === undefined ? <Loading /> : <ImageGrid />}
							</div>
						</div>
					</div>
				)}
			</PhotoGramContext.Consumer>
		);
	}
}

export default HomePage;
