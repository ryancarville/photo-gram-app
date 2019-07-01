import React, { Component } from 'react';
import PhotoGramContext from '../../PhotoGramContext';
import './upload.css';

export default class Upload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imagePreveiw: null,
			albumNames: []
		};
		this.handleImagePreveiw = this.handleImagePreveiw.bind(this);
		this.getAlbumNames = this.getAlbumNames.bind(this);
	}
	static defaultProps = { albums: [] };
	static contextType = PhotoGramContext;

	handleUpload = e => {
		e.preventDefault();
		alert('This is just a mock UX for Upload images');
		this.handleBack();
	};

	handleBack = e => {
		this.props.history.goBack();
	};

	getAlbumNames(e) {
		console.log(e);
		const albums = e.map(album => (
			<option key={album.id} value={album.id}>
				{album.name}
			</option>
		));
		return albums;
	}

	handleImagePreveiw(e) {
		this.setState({
			imagePreveiw: URL.createObjectURL(e.target.files[0])
		});
	}
	render() {
		return (
			<PhotoGramContext.Consumer>
				{context => (
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
							<img
								src={this.state.imagePreveiw}
								className='imgPreveiw'
								alt=''
							/>
							<label htmlFor='comments'>
								{' '}
								Comments
								<textarea
									className='uploadFormInput'
									name='comments'
									id='commentsForImage'
								/>
							</label>
							<label htmlFor='tags'>
								Tags{' '}
								<input
									className='uploadFormInput'
									type='text'
									name='tags'
									id='tagsForImage'
								/>
							</label>
							<label htmlFor='album'>
								Album{' '}
								<select className='uploadFormInput'>
									{this.getAlbumNames(context.albums)}
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
								value='Cancel'
								name='returnHome'
								id='returnHomeBtn'
								onClick={this.handleBack}
							/>
						</form>
					</div>
				)}
			</PhotoGramContext.Consumer>
		);
	}
}
