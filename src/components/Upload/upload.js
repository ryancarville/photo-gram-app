import React, { Component } from 'react';
import './upload.css';

export default class Upload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imagePreveiw: null
		};
		this.handleImagePreveiw = this.handleImagePreveiw.bind(this);
	}
	handleUpload = e => {
		e.preventDefault();
		alert('This is just a mock UX for Upload images');
		this.handleBack();
	};

	handleBack = e => {
		this.props.history.goBack();
	};

	handleImagePreveiw(e) {
		this.setState({
			imagePreveiw: URL.createObjectURL(e.target.files[0])
		});
	}
	render() {
		return (
			<div className='upload-page-container'>
				<form
					className='imageUploadForm'
					encType='multipart/form-data'
					onSubmit={this.handleUpload}>
					<label htmlFor='fileToUpload'>
						{' '}
						Select image to upload
						<input
							className='uploadFormInput'
							type='file'
							name='fileToUpload'
							id='fileToUpload'
							onChange={this.handleImagePreveiw}
						/>
					</label>
					<img src={this.state.imagePreveiw} className='imgPreveiw' />
					<label htmlFor='comments'>
						{' '}
						Comments
						<textarea
							className='uploadFormInput'
							name='comments'
							id='commentsForImage'
						/>
					</label>
					<label htmlFor='album'>
						Album{' '}
						<select className='uploadFormInput'>
							<option value='album1'>Album 1</option>
							<option value='album2'>Album 2</option>
							<option value='album3'>Album 3</option>
							<option value='album4'>Album 4</option>
						</select>
					</label>
					<label htmlFor='date'>
						Date Taken{' '}
						<input
							className='uploadFormInput'
							type='date'
							name='date'
							id='dateForImage'
						/>
					</label>
					<input
						type='submit'
						value='Upload Image'
						name='submit'
						id='uploadFormBtn'
					/>
					<input
						type='button'
						value='Return Home'
						name='returnHome'
						id='returnHomeBtn'
						onClick={this.handleBack}
					/>
				</form>
			</div>
		);
	}
}
