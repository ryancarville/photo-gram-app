import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
import { Image, Transformation } from 'cloudinary-react';
import PhotoGramApiService from '../../services/photoGram-api-service';
import config from '../../config';
import './addAlbum.css';

export default class AddAlbum extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: this.props.match.params.user_id,
			album_name: '',
			img_url: null,
			defaultAlbum: 'photoGram_Images/dztb9fs9e3op4cikjqdp',
			cloudinaryPreview: '',
			redirect: false,
			widget: window.cloudinary.createUploadWidget(
				{
					cloudName: config.CLOUDINARY_NAME,
					uploadPreset: config.CLOUDINARY_ALBUM_IMAGES_PRESET,
					cropping: 'server'
				},
				(error, result) => {
					console.log(result.info.public_id);
					if (!error && result && result.event === 'success') {
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
	//set context for component
	static contextType = PhotoGramContext;
	//set state on folder name change
	handleFolderName = e => {
		this.setState({
			album_name: e.target.value
		});
	};
	//back button callback
	goHome = e => {
		const user_id = this.state.user_id;
		this.props.history.push(`/user/${user_id}`);
	};
	//handle form submit event
	handleSubmit = e => {
		e.preventDefault();
		if (this.state.img_url === null) {
			this.setState(
				{
					img_url:
						'https://res.cloudinary.com/rcarville/image/upload/v1568384975/photoGram_Images/dztb9fs9e3op4cikjqdp'
				},
				() => {
					const { user_id, album_name, img_url } = this.state;
					const albumData = { user_id, album_name, img_url };
					PhotoGramApiService.addAlbum(albumData).then(() =>
						this.setState({
							redirect: true
						})
					);
				}
			);
		}
	};
	//open image uploader widget
	openWidget = e => {
		this.state.widget.open();
	};

	render() {
		//on sucsessful add of album redirect to home page
		if (this.state.redirect) {
			const user_id = this.state.user_id;
			return <Redirect to={`/user/${user_id}`} />;
		}
		console.log(this.state.cloudinaryPreview);
		return (
			<div className='add-album-container'>
				<div className='folderUploadErrorMsg'>{this.state.error}</div>
				<form
					className='addFolderForm'
					onSubmit={this.handleSubmit}
					encType='multipart/form-data'>
					<label htmlFor='folderName'>Album Name</label>
					<input
						type='text'
						name='folderName'
						onChange={this.handleFolderName}
						required
					/>
					<label htmlFor='folderImage'>Album Image</label>
					<p>Choose a image that you would like to be the album cover</p>
					<div className='folderIconPreview'>
						{this.state.cloudinaryPreview ? (
							<Image
								cloudName={config.CLOUDINARY_NAME}
								publicId={this.state.cloudinaryPreview}>
								<Transformation
									height='100'
									width='100'
									crop='lfill'
									radius='max'
									border='3px_solid_black'
								/>
							</Image>
						) : (
							<Image
								cloudName={config.CLOUDINARY_NAME}
								publicId={this.state.defaultAlbum}>
								<Transformation
									height='100'
									width='100'
									crop='lfill'
									radius='max'
									border='3px_solid_black'
								/>
							</Image>
						)}
						<p>{this.state.album_name}</p>
					</div>
					<button
						type='button'
						name='folderImage'
						id='folderImage'
						onClick={this.openWidget}>
						Upload Image
					</button>

					<button type='submit' value='add folder'>
						Add Album{' '}
					</button>
					<button type='button' value='cancel' onClick={this.goHome}>
						Cancel
					</button>
				</form>
			</div>
		);
	}
}
