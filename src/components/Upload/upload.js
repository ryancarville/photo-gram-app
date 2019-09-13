import React, { Component } from 'react';
import SelectFile from '../SelectFile/selectFile';
import FileSelected from '../FileSelected/fileSelected.js';
import './upload.css';
import PhotGramContext from '../../PhotoGramContext';

export default class Upload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			album_id: this.props.location.albumId,
			fileSelected: false,
			imagePreview: null,
			albumNames: []
		};
	}

	static contextType = PhotGramContext;
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
		const user_id = this.context.user.id;
		this.props.history.push(`/user/${user_id}`);
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
