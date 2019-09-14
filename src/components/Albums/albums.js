import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import PhotoGramContext from '../../PhotoGramContext';
import { Image, Transformation } from 'cloudinary-react';
import './albums.css';

const createAlbums = (albums, user) =>
	albums.map(album => {
		const imageUrl = album.img_url;
		const image = imageUrl.slice(50, imageUrl.length);
		return (
			<li key={album.id} id={album.id}>
				<Link
					to={`/user/${user.id}/albums/${album.id}`}
					style={{ textDecoration: 'none', color: 'deepskyblue' }}>
					<Image cloudName={config.CLOUDINARY_NAME} publicId={image}>
						<Transformation
							height='100'
							width='100'
							crop='fill'
							radius='max'
							border='3px_solid_black'
						/>
					</Image>
					<p>{album.album_name}</p>
				</Link>
			</li>
		);
	});

class Albums extends Component {
	//set contet for component
	static contextType = PhotoGramContext;
	//create all albums withing the context array

	render() {
		const user = this.context.user;
		const albums = this.context.albums;

		return (
			<div className='albums-bar' id='albums'>
				<ul>{createAlbums(albums, user)}</ul>
			</div>
		);
	}
}

export default Albums;
