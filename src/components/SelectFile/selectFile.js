import React, { Component } from 'react';

export default class SelectFile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imagePreview: null
		};
	}
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
