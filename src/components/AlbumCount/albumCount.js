import React, { Component } from 'react';
import PhotoGramContext from '../../PhotoGramContext';

export default class numOfAlbums extends Component {
	static contextType = PhotoGramContext;
	//counts the currnet number of album objects in context array
	render() {
		const count = this.props.albums.length;
		return <span>{count}</span>;
	}
}
