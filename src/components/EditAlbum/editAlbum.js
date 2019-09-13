import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PhotoGramApiService from '../../services/photoGram-api-service';
import PhotoGramContext from '../../PhotoGramContext';
import { Image, Transformation } from 'cloudinary-react';
import DeleteConfirm from '../DeleteConfirm/deleteConfirm';
import config from '../../config';
import './editAlbum.css';

export default class EditAlbum extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: this.props.match.params.user_id,
			id: this.props.match.params.album_id,
			album_name: '',
			img_url: '',
			cloudinaryPreview: '',
			showDeletePopup: false,
			redirect: false,
			widget: window.cloudinary.createUploadWidget(
				{
					cloudName: config.CLOUDINARY_NAME,
					uploadPreset: config.CLOUDINARY_ALBUM_IMAGES_PRESET,
					cropping: 'server'
				},
				(error, result) => {
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

		this.getAlbumData = () => {
			const user = { id: this.state.user_id };
			this.context
				.checkIfLoggedIn(user)
				.then(() => {
					const albumData = this.context.state.albums.filter(
						album => album.id.toString() === this.state.id
					);
					console.log(albumData);
					return albumData;
				})
				.then(album => {
					console.log(album);
					const image = album[0].img_url.slice(50, album[0].img_url.length);
					this.setState({
						album_name: album[0].album_name,
						img_url: album[0].img_url,
						cloudinaryPreview: image
					});
				});
		};
		this.context = PhotoGramContext;
	}
	static contextType = PhotoGramContext;
	componentDidMount() {
		this.getAlbumData();
	}
	//open new upload widget
	openWidget = () => this.state.widget.open();
	//handle album name change
	handleAblumNameChange = e => {
		this.setState({
			album_name: e.target.value
		});
		console.log(this.state.album_name);
	};
	//handle back event
	handleBack = e => {
		const user_id = this.state.user_id;
		const album_id = this.state.id;
		this.props.history.push(`/user/${user_id}/albums/${album_id}`);
	};
	deletePopup = e => {
		this.setState({
			showDeletePopup: true
		});
	};
	closePopUp = e => {
		console.log(this.context.images);
		this.setState({ showDeletePopup: false });
	};

	handleSubmit = e => {
		e.preventDefault();
		const { id, album_name, img_url } = this.state;
		const albumData = { id, album_name, img_url };
		console.log(albumData);
		PhotoGramApiService.updateAlbum(albumData).then(() =>
			this.setState({
				redirect: true
			})
		);
	};

	//delete request of Album sent to API
	deleteAlbumRequest = album_id => {
		function changeImageAlbum(context, album_id) {
			const albumImages = context.images.filter(
				img => img.album_id.toString() === album_id
			);
			albumImages.forEach(img => (img.album_id = null));
			albumImages.forEach(img => PhotoGramApiService.updateImage(img));
		}
		changeImageAlbum(this.context, album_id);
		PhotoGramApiService.deleteAlbum(album_id).then(() => {
			this.setState({
				redirect: true
			});
		});
	};

	render() {
		if (this.state.redirect) {
			const user_id = this.state.user_id;
			const album_id = this.state.id;
			return <Redirect to={`/user/${user_id}`} />;
		}
		const { id, album_name } = this.state;
		const album = { id, album_name };
		return (
			<div className='editAlbumPageContainer'>
				<p>Edit Album</p>
				<form onSubmit={this.handleSubmit}>
					<Image
						cloudName={config.CLOUDINARY_NAME}
						publicId={this.state.cloudinaryPreview}>
						<Transformation
							height='100'
							width='100'
							crop='fill'
							radius='max'
							border='3px_solid_black'
						/>
					</Image>
					<button type='button' onClick={() => this.openWidget()}>
						Upload New Image
					</button>
					<input
						type='text'
						value={this.state.album_name}
						onChange={this.handleAblumNameChange}
					/>
					<button type='button' id='removeAlbumBtn' onClick={this.deletePopup}>
						Delete Album
					</button>

					<button type='submit'>Save Changes</button>
					<button type='button' onClick={() => this.handleBack()}>
						Cancel
					</button>
					{this.state.showDeletePopup ? (
						<DeleteConfirm
							album={album}
							user_id={this.state.user_id}
							deleteAlbumRequest={this.deleteAlbumRequest}
							close={this.closePopUp}
						/>
					) : null}
				</form>
			</div>
		);
	}
}
