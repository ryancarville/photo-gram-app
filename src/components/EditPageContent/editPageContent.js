import React, { Component } from 'react';
import PhotoGramContext from '../../PhotoGramContext';
import PhotoGramApiService from '../../services/photoGram-api-service';
export default class EditPageContent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

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
	};
	//set state on change for date
	handleDateChange = e => {
		this.setState({
			date_created: e.target.value
		});
	};
	//set state on change for tags
	handleTagsChange = e => {
		this.setState({
			tags: e.target.value
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
	//handle fomr submit event
	handleSubmit = e => {
		e.preventDefault();
		const user_id = this.state.user_id;
		const { id, img_url, caption, tags, album_id, date_created } = this.state;
		const newImageInfo = {
			user_id,
			id,
			img_url,
			caption,
			tags,
			album_id,
			date_created
		};
		PhotoGramApiService.updateImage(newImageInfo)
			.then(data => this.context.updateImage(newImageInfo))
			.then(
				setTimeout(() => {
					this.setState({
						redirect: true
					});
				}, 1000)
			)
			.catch(err => this.setState({ error: err }));
	};
	render() {
		const { image } = this.props;
		console.log(this.props.history);
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
								src={image.img_url}
								alt={image.tags}
							/>
							<form onSubmit={this.handleSubmit} className='imageEditForm'>
								<label htmlFor='caption'>
									Caption
									<textarea
										type='text'
										name='caption'
										id='captionTextarea'
										autoFocus='autofoucs'
										value={image.caption}
										onChange={this.handleCaptionChange}
									/>
								</label>
								<label htmlFor='album'>
									Album{' '}
									<select
										value={image.album_id}
										onChange={this.handleAlbumChange}>
										<option value=''>No Album</option>
										{this.getAlbumNames(context.albums)}
									</select>
								</label>
								<label htmlFor='tags'>
									Tags{' '}
									<input
										type='text'
										name='tags'
										value={image.tags}
										onChange={this.handleTagsChange}
									/>
								</label>
								<label htmlFor='date'>
									Date{' '}
									<input
										type='date'
										name='date'
										value={image.date_created}
										onChange={this.handleDateChange}
									/>
								</label>
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
