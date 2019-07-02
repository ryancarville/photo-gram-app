import React, { Component } from 'react';
import PhotoGramContext from '../../PhotoGramContext';
import './addAlbum.css';

export default class AddAlbum extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			imgUrl: '',
			imagePreview: null
		};
		this.handleImagePreview = this.handleImagePreview.bind(this);
	}

	static contextType = PhotoGramContext;
	//back button callback
	handleBack = e => {
		this.props.history.goBack();
	};
	//handle form submit event
	handleSubmit = e => {
		e.preventDefault();
		alert(
			'This is just a mock UX for Upload images.  Folder image will be set to a default image.'
		);
		console.log(this.state);
		this.context.addAlbum(this.state);
		this.props.history.goBack();
	};
	//set state on folder name change
	handleFolderName = e => {
		this.setState({
			id: e.target.value,
			name: e.target.value
		});
	};
	//set state for image preview
	handleImagePreview(e) {
		this.setState({
			imgUrl:
				'http://beardystudios.com/Bloc_Capstone/photoGram/images/defaultFolderIcon.png',
			imagePreview: URL.createObjectURL(e.target.files[0])
		});
	}

	render() {
		return (
			<div className='add-album-container'>
				<form
					className='addFolderForm'
					onSubmit={this.handleSubmit}
					encType='multipart/form-data'>
					<label htmlFor='folderName'>
						Folder Name
						<input
							type='text'
							name='folderName'
							onChange={this.handleFolderName}
							required
						/>
					</label>
					<label htmlFor='folderImage'>
						Folder Image
						<input
							type='file'
							name='folderImage'
							id='folderImage'
							onChange={this.handleImagePreview}
						/>
					</label>
					<div className='folderIconPreview'>
						<img
							src={this.state.imagePreview}
							alt={this.state.alt}
							className='albumImgPreview'
						/>
						<p>{this.state.name}</p>
					</div>

					<button type='submit' value='add folder'>
						Add Folder{' '}
					</button>
					<button type='button' value='cancel' onClick={this.handleBack}>
						Cancel
					</button>
				</form>
			</div>
		);
	}
}
