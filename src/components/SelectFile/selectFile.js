import React, { Component } from 'react';
import './selectFile.css';

export default class SelectFile extends Component {
	componentDidMount() {
		document.getElementById('fileToUpload').click();
	}

	handleOnChange = e => {
		const image = URL.createObjectURL(e.target.files[0]);
		this.props.handleImagePreview(image);
	};
	render() {
		return (
			<input
				className='uploadFormInput'
				type='file'
				name='fileToUpload'
				id='fileToUpload'
				onChange={this.handleOnChange}
			/>
		);
	}
}
