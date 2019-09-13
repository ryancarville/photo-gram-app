import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
import PhotoGramApiService from '../../services/photoGram-api-service';
export default class EditPageContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user,
			id: this.props.image.id,
			img_url: this.props.image.img_url,
			caption: this.props.image.caption,
			tags: this.props.image.tags,
			album_id: this.props.image.album_id,
			date_created: this.props.image.date_created,
			error: null
		};
	}
	//set context for component
	static contextType = PhotoGramContext;
	//set state on change for caption
	handleCaptionChange = e => {
		this.setState({
			caption: e.target.value
		});
	};
	//set state on change for album
	handleAlbumChange = e => {
		this.setState({
			album_id: e.target.value
		});
		if (e.target.value === '') {
			this.setState({ album_id: null });
		}
	};
	//set state on change for tags
	handleTagsChange = e => {
		this.setState({
			tags: e.target.value
		});
	};
	//set state on change for date
	handleDateChange = e => {
		this.setState({
			date_created: e.target.value
		});
	};
	//handle back event
	goBack = e => {
		this.props.history.goBack();
	};
	//get all albums for select menu
	getAlbumNames = e => {
		const albums = e.map(album => (
			<option key={album.id} value={album.id}>
				{album.album_name}
			</option>
		));
		return albums;
	};

	//handle album image change
	handleAlbumImage = e => {
		const { img_url, album_id } = this.state;
		const id = album_id;
		const newAlbumImage = { img_url, id };
		PhotoGramApiService.updateAlbum(newAlbumImage);
	};
	//handle fomr submit event
	handleSubmit = e => {
		e.preventDefault();

		const { id, img_url, caption, tags, album_id, date_created } = this.state;
		const newImageInfo = { id, img_url, caption, tags, album_id, date_created };
		PhotoGramApiService.updateImage(newImageInfo)

			.then(
				setTimeout(() => {
					this.setState({
						redirect: true
					});
				}, 500)
			)
			.catch(err => this.setState({ error: err }));
	};
	render() {
		const date = this.props.image.date_created.slice(0, 10);
		const { user } = this.state;
		const image = { id: this.state.id };
		//on successful save of data redirect to image page
		if (this.state.redirect) {
			return <Redirect to={`/user/${user.id}/images/${image.id}`} />;
		}
		return (
			<PhotoGramContext.Consumer>
				{context => (
					<>
						<button type='button' id='imagePageBackBtn' onClick={this.goBack}>
							&#171;{' '}
						</button>
						<div className='edit-page-container'>
							<img
								key={image.id}
								className='imgPreview'
								src={this.state.img_url}
								alt={this.state.tags}
							/>
							<form onSubmit={this.handleSubmit} className='imageEditForm'>
								<label htmlFor='caption'>Caption</label>
								<textarea
									type='text'
									name='caption'
									id='captionTextarea'
									autoFocus='autofoucs'
									value={this.state.caption}
									onChange={this.handleCaptionChange}
								/>

								<label htmlFor='album'>
									Album{' '}
									<select
										value={this.state.album_id}
										onChange={this.handleAlbumChange}>
										<option value=''>No Album</option>
										{this.getAlbumNames(context.albums)}
									</select>
								</label>
								<label htmlFor='albumImage'>Make Album Image</label>
								<input
									type='checkbox'
									name='makeAlbumImage'
									id='makeAlbumImageCheck'
									onChange={this.handleAlbumImage}
								/>

								<label htmlFor='tags'>
									Tags{' '}
									<input
										type='text'
										name='tags'
										value={this.state.tags}
										onChange={this.handleTagsChange}
									/>
								</label>
								<label htmlFor='date'>
									Date{' '}
									<input
										type='date'
										name='date'
										value={date}
										onChange={this.handleDateChange}
									/>
								</label>
								<div className='editPageErr'>{this.state.error}</div>
								<div className='imageEditFormBtnContainer'>
									<button type='submit'>Save</button>
									<button type='button' onClick={this.goBack}>
										Cancel
									</button>
								</div>
							</form>
						</div>
					</>
				)}
			</PhotoGramContext.Consumer>
		);
	}
}
