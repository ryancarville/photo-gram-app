import React, { Component } from 'react';
import PhotoGramContext from '../../PhotoGramContext';

export default class numOfAlbums extends Component {
	static contextType = PhotoGramContext;

	render() {
		const count = this.context.albums.length;
		return <span>{count}</span>;
	}
}
