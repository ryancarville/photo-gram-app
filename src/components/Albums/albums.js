import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
import './albums.css';

class Albums extends Component {
	static contextType = PhotoGramContext;
	//create all albums withing the context array
	createAlbum = albums =>
		this.props.albums.map(album => {
			const userId = this.props.userId;
			return (
				<li key={album.id} id={album.id}>
					<Link to={`/user/${userId}/albums/${album.id}`}>
						<img src={album.img_url} className='albumImg' alt={album.alt} />
						<p>{album.album_name}</p>
					</Link>
				</li>
			);
		});
	render() {
		const { albums } = this.props.albums;
		const userId = this.context.state.userId;
		return (
			<PhotoGramContext.Consumer>
				{context => (
					<div className='albums-bar' id='albums'>
						<ul>
							{this.createAlbum(albums)}
							<li>
								<Link to={`/user/${userId}/albums/addAlbum`} id='addAlbum'>
									<img
										src='http://beardystudios.com/Bloc_Capstone/photoGram/images/addAlbumBtn.png'
										className='albumImg'
										id='addAlbumButton'
										alt='add album button'
									/>
									<p> add album</p>
								</Link>
							</li>
						</ul>
					</div>
				)}
			</PhotoGramContext.Consumer>
		);
	}
}

export default Albums;
