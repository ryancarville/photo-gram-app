import React, { Component } from 'react';
import PhotoGramContext from '../../PhotoGramContext';
import './upload.css';

export default class Upload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fileSelected: false,
			imagePreveiw: null,
			albumNames: []
		};
		this.handleImagePreveiw = this.handleImagePreveiw.bind(this);
		this.getAlbumNames = this.getAlbumNames.bind(this);
	}
	static defaultProps = { albums: [] };
	static contextType = PhotoGramContext;
	//handle form submit
	handleUpload = e => {
		e.preventDefault();
		alert('This is just a mock UX for Upload images');
		this.handleBack();
	};
	//handle back event
	handleBack = e => {
		this.props.history.goBack();
	};

	//go back to homepage
	handleGoHome = e => {
		this.props.history.push('/homePage');
	};
	//get all albums in context array
	getAlbumNames(e) {
		console.log(e);
		const albums = e.map(album => (
			<option key={album.id} value={album.id}>
				{album.name}
			</option>
		));
		return albums;
	}
	//handle image preview on adding image to upload form
	handleImagePreveiw(e) {
		this.setState({
			imagePreveiw: URL.createObjectURL(e.target.files[0]),
			fileSelected: true
		});
	}

	componentDidMount() {
		document.getElementById('fileToUpload').click();
	}

	render() {
		const selectFile = (
			<input
				className='uploadFormInput'
				type='file'
				name='fileToUpload'
				id='fileToUpload'
				onChange={this.handleImagePreveiw}
			/>
		);

		const fileSelected = (
			<PhotoGramContext.Consumer>
				{context => (
					<form
						className='imageUploadForm'
						encType='multipart/form-data'
						onSubmit={this.handleUpload}>
						<img src={this.state.imagePreveiw} className='imgPreveiw' alt='' />
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
							onClick={this.handleGoHome}
						/>
					</form>
				)}
			</PhotoGramContext.Consumer>
		);

		const uploadForm = this.state.fileSelected ? fileSelected : selectFile;
		return <div className='upload-page-container'>{uploadForm}</div>;
	}
}
