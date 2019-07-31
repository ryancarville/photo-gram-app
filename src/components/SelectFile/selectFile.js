import React, { Component } from 'react';
import config from '../../config';
import './selectFile.css';

export default class SelectFile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageUrl: '',
			widget: window.cloudinary.createUploadWidget(
				{
					cloudName: config.CLOUDINARY_NAME,
					uploadPreset: config.CLOUDINARY_UPLOAD_PRESET,
					cropping: 'server'
				},
				(error, result) => {
					if (!error && result && result.event === 'success') {
						this.setState({
							uploadedImage: result.info.public_id,
							imageUrl:
								'https://res.cloudinary.com/rcarville/image/upload/' +
								result.info.public_id
						});
					}
				}
			)
		};
	}
	//simulate click on mount to open widget
	componentDidMount() {
		document.getElementById('fileToUpload').click();
	}
	//handle image upload url
	handleOnChange = e => {
		const image = this.state.imageUrl;
		this.props.handleImagePreview(image);
	};
	//open image upload widget
	openWidget = () => {
		this.state.widget.open();
	};
	render() {
		//on successful upload go to image change handler
		if (this.state.imageUrl) {
			this.handleOnChange();
		}
		return (
			<button
				className='uploadFormInput'
				type='button'
				name='fileToUpload'
				id='fileToUpload'
				onClick={this.openWidget}
			/>
		);
	}
}
