import React, { Component } from 'react';
import PhotoGramContext from '../../PhotoGramContext';
import config from '../../config';
import { Image, Transformation } from 'cloudinary-react';
import './addAlbum.css';

export default class AddAlbum extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: this.props.match.params.user_id,
			album_id: null,
			album_name: '',
			img_url: '',
			cloudinaryPreview: '',
			widget: window.cloudinary.createUploadWidget(
				{
					cloudName: config.CLOUDINARY_NAME,
					uploadPreset: config.CLOUDINARY_ALBUM_IMAGES_PRESET,
					cropping: 'server'
				},
				(error, result) => {
					if (!error && result && result.event === 'success') {
						console.log('Done! Here is the image info: ', result.info);
						this.setState({
							cloudinaryPreview: result.info.public_id,
							img_url:
								'https://res.cloudinary.com/rcarville/image/upload/' +
								result.info.public_id
						});
					}
				}
			),
			error: null
		};
	}

	static contextType = PhotoGramContext;
	//set state on folder name change
	handleFolderName = e => {
		this.setState({
			album_name: e.target.value
		});
	};
	//back button callback
	handleBack = e => {
		const user_id = this.state.user_id;
		this.props.history.push(`/user/${user_id}`);
	};
	//handle form submit event
	handleSubmit = e => {
		e.preventDefault();
		const albumData = this.state;
		console.log(albumData);
		fetch(config.API_ENDPOINT + '/albums/addAlbum', {
			method: 'POST',
			body: JSON.stringify(albumData),
			headers: {
				'content-type': 'application/json'
			},
			mode: 'cors'
		})
			.then(res => res.json())
			.then(data => {
				if (data.error) {
					this.setState({
						error: data.error
					});
				} else {
					this.setState({
						albumData: { album_id: data.id }
					});
				}
			})
			.catch(err =>
				this.setState({
					error: err
				})
			);
		this.context.refreshState();
		this.handleBack();
	};
	//open image uploader widget
	openWidget = e => {
		this.state.widget.open();
	};

	render() {
		return (
			<div className='add-album-container'>
				<div className='folderUploadErrorMsg'>{this.state.error}</div>
				<form
					className='addFolderForm'
					onSubmit={this.handleSubmit}
					encType='multipart/form-data'>
					<label htmlFor='folderName'>Folder Name</label>
					<input
						type='text'
						name='folderName'
						onChange={this.handleFolderName}
						required
					/>
					<label htmlFor='folderImage'>Folder Image</label>
					<button
						type='button'
						name='folderImage'
						id='folderImage'
						onClick={this.openWidget}>
						Upload Image
					</button>
					<div className='folderIconPreview'>
						<Image
							cloudName={config.CLOUDINARY_NAME}
							publicId={this.state.cloudinaryPreview}>
							<Transformation
								height='100'
								width='100'
								crop='scale'
								radius='100'
							/>
						</Image>
						<p>{this.state.album_name}</p>
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
