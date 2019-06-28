import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
import './albums.css';

class Albums extends Component {
	static contextType = PhotoGramContext;

	createAlbum = albums =>
		this.context.albums.map(album => {
			return (
				<li id={album.id}>
					<Link to={`/albums/${album.id}`}>
						<img src={album.imgUrl} className='albumImg' alt={album.alt} />

						<p>{album.name}</p>
					</Link>
				</li>
			);
		});
	render() {
		const { albums } = this.context.albums;

		return (
			<PhotoGramContext.Consumer>
				{context => (
					<div className='albums-bar' id='albums'>
						<ul>{this.createAlbum(albums)}</ul>
					</div>
				)}
			</PhotoGramContext.Consumer>
		);
	}
}

export default Albums;
