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
			albumData: {},
			cloudinaryPreview: '',
			redirect: false,
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
							albumData: {
								user_id: this.state.albumData.user_id,
								album_name: this.state.albumData.album_name,
								img_url:
									'https://res.cloudinary.com/rcarville/image/upload/' +
									result.info.public_id
							}
						});
						console.log(this.state);
					}
				}
			),
			error: null
		};
	}
	//set component state on mount with user id as integer
	componentDidMount() {
		let user_id = this.props.match.params.user_id;
		user_id = parseInt(user_id, 10);
		console.log(user_id);
		this.setState({
			albumData: {
				user_id: user_id,
				album_name: '',
				img_url: ''
			}
		});
	}
	//set context for component
	static contextType = PhotoGramContext;
	//set state on folder name change
	handleFolderName = e => {
		this.setState({
			albumData: {
				user_id: this.state.albumData.user_id,
				album_name: e.target.value,
				img_url: this.state.albumData.img_url
			}
		});
	};
	//back button callback
	goHome = e => {
		const user_id = this.state.albumData.user_id;
		this.props.history.push(`/user/${user_id}`);
	};
	//handle form submit event
	handleSubmit = e => {
		e.preventDefault();
		const albumData = this.state.albumData;
		PhotoGramApiService.addAlbum(albumData)
			.then(data => this.context.setAppStateAlbums(data))
			.then(
				setTimeout(() => {
					this.setState({
						redirect: true
					});
				}, 500)
			);
	};
	//open image uploader widget
	openWidget = e => {
		this.state.widget.open();
	};

	render() {
		//on sucsessful add of album redirect to home page
		if (this.state.redirect) {
			const user_id = this.state.albumData.user_id;
			PhotoGramApiService.refreshContent(user_id);
			return <Redirect to={`/user/{user_id}`} />;
		}
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
					<button type='button' value='cancel' onClick={this.goHome}>
						Cancel
					</button>
				</form>
			</div>
		);
	}
}
