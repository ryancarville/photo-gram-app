import React, { Component } from 'react';
import PhotoGramContext from '../../PhotoGramContext';

export default class numOfImages extends Component {
	static contextType = PhotoGramContext;

	render() {
		const count = this.context.images.length;
		return <span>{count}</span>;
	}
}
