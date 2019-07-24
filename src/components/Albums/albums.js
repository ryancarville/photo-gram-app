import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
import './albums.css';

class Albums extends Component {
	static contextType = PhotoGramContext;
	//create all albums withing the context array
	createAlbums = albums =>
		albums.map(album => {
			const user = this.context.user;
			return (
				<li key={album.id} id={album.id}>
					<Link
						to={{
							pathname: `/user/${user.id}/albums/${album.id}`,
							state: {
								album_name: album.album_name
							}
						}}>
						<img src={album.img_url} className='albumImg' alt={album.alt} />
						<p>{album.album_name}</p>
					</Link>
				</li>
			);
		});
	render() {
		const user = this.context.user;
		const albums = this.context.albums;
		return (
			<div className='albums-bar' id='albums'>
				<ul>
					{this.createAlbums(albums)}
					<li>
						<Link to={`/user/${user.id}/addAlbum`} id='addAlbum'>
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
