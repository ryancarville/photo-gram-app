import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import PhotoGramContext from '../../PhotoGramContext';
import { Image, Transformation } from 'cloudinary-react';
import './albums.css';

class Albums extends Component {
	//set contet for component
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
						<Image
							cloudName={config.CLOUDINARY_NAME}
							publicId={album.img_url}
							id='albumThumb'>
							<Transformation
								height='100'
								crop='fill'
								radius='max'
								border='2px_solid_black'
							/>
						</Image>

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
								src='https://beardystudios.com/Bloc_Capstone/photoGram/images/addAlbumBtn.png'
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
