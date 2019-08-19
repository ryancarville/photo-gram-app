import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import config from '../../config';
import './selectFile.css';
import PhotGramContext from '../../PhotoGramContext';

export default class SelectFile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user_id: '',
			imageUrl: '',
			close: false,
			widget: window.cloudinary.createUploadWidget(
				{
					cloudName: config.CLOUDINARY_NAME,
					uploadPreset: config.CLOUDINARY_UPLOAD_PRESET,
					cropping: 'server'
				},
				(error, result) => {
					if (!error && result.event === 'close') {
						this.setState({ close: true });
					} else if (!error && result && result.event === 'success') {
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
	static contextType = PhotGramContext;
	//simulate click on mount to open widget
	componentDidMount() {
		this.setState({ user_id: this.context.user.id });
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
		if (this.state.close) {
			return <Redirect to={`/user/${this.state.user_id}`} />;
		}
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
