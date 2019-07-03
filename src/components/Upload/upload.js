import React, { Component } from 'react';
import PhotoGramContext from '../../PhotoGramContext';
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
		this.handleImagePreview = this.handleImagePreview.bind(this);
	}

	//handle form submit
	handleUpload = e => {
		e.preventDefault();
		alert('This is just a mock UX for Upload images');
		this.handleBack();
	};

	//handle image preview on adding image to upload form
	handleImagePreview(imagePreview) {
		console.log('Img preview ran', imagePreview);
		this.setState(
			{
				imagePreview: imagePreview,
				fileSelected: true
			},
			() => {
				console.log(this.state);
			}
		);
	}

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
