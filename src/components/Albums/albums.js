import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './albums.css';

class Albums extends Component {
	constructor(props) {
		super(props);
		this.state = {
			albums: this.props.albums,
			user_id: this.props.user_id,
			images: this.props.images
		};
	}

	//create all albums withing the context array
	createAlbums = albums =>
		albums.map(album => {
			const user_id = this.state.user_id;
			return (
				<li key={album.id} id={album.id}>
					<Link
						to={{
							pathname: `/user/${user_id}/albums/${album.id}`,
							state: {
								images: this.state.images,
								album_name: album.name
							}
						}}>
						<img src={album.img_url} className='albumImg' alt={album.alt} />
						<p>{album.album_name}</p>
					</Link>
				</li>
			);
		});
	render() {
		const user_id = this.state.user_id;
		return (
			<div className='albums-bar' id='albums'>
				<ul>
					{this.createAlbums(this.state.albums)}
					<li>
						<Link to={`/user/${user_id}/albums/addAlbum`} id='addAlbum'>
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
		);
	}
}

export default Albums;
