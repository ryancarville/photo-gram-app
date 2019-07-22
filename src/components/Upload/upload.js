import React, { Component } from 'react';
import SelectFile from '../SelectFile/selectFile';
import FileSelected from '../FileSelected/fileSelected.js';
import './upload.css';

export default class Upload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fileSelected: false,
			imagePreview: null,
			albumNames: []
		};
	}

	//handle image preview on adding image to upload form
	handleImagePreview = imagePreview => {
		this.setState({
			imagePreview: imagePreview,
			fileSelected: true
		});
	};

	//handle back event
	handleBack = e => {
		this.props.history.goBack();
	};

	//go back to homepage
	handleGoHome = e => {
		this.props.history.push('/homePage');
	};

	render() {
		const uploadForm = this.state.fileSelected ? (
			<FileSelected
				state={this.state}
				handleUpload={this.handleUpload}
				handleGoHome={this.handleGoHome}
				handleBack={this.handleBack}
			/>
		) : (
			<SelectFile handleImagePreview={this.handleImagePreview} />
		);
		return <div className='upload-page-container'>{uploadForm}</div>;
	}
}
