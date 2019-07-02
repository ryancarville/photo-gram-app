import React, { Component } from 'react';
import PhotoGramContext from '../../PhotoGramContext';

export default class numOfImages extends Component {
	static contextType = PhotoGramContext;
	//counts all images in context array
	render() {
		const count = this.context.images.length;
		return <span>{count}</span>;
	}
}
