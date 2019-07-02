import React, { Component } from 'react';

export default class SelectFile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			simulateClick: true
		};
	}
	componentDidMount() {
		if (this.state.simulateClick) {
			document.getElementById('fileToUpload').click();
		}
	}
	render() {
		return (
			<input
				className='uploadFormInput'
				type='file'
				name='fileToUpload'
				id='fileToUpload'
				onChange={this.props.handleImagePreveiw}
			/>
		);
	}
}
