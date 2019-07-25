import React, { Component } from 'react';
import PhotoGramContext from '../../PhotoGramContext';
import config from '../../config';
import './editPage.css';

export default class EditPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: this.props.match.params.user_id,
			image_id: this.props.match.params.image_id
		};
	}

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
		console.log(e);
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
		const {
			image_id,
			img_url,
			caption,
			tags,
			album_id,
			date_created
		} = this.state;
		const data = {
			user_id,
			image_id,
			img_url,
			caption,
			tags,
			album_id,
			date_created
		};
		fetch(config.API_ENDPOINT + `/images/${image_id}`, {
			method: 'PATCH',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(this.context.refreshState())
			.catch(err => this.setState({ error: err }));
	};

	componentWillMount() {
		const image_id = this.state.image_id;
		const image = this.context.getImageData(image_id);
		this.setState({
			img_url: image.img_url,
			caption: image.caption,
			tags: image.tags,
			date_created: image.date_created,
			album_id: image.album_id
		});
	}

	render() {
		const image_id = this.state.image_id;

		return (
			<PhotoGramContext.Consumer>
				{context => (
					<>
						<button type='button' id='imagePageBackBtn' onClick={this.goBack}>
							&#171;{' '}
						</button>
						<div className='edit-page-container'>
							<img
								key={image_id}
								className='imgPreview'
								src={this.state.img_url}
								alt={this.state.tags}
							/>
							<form onSubmit={this.handleSubmit} className='imageEditForm'>
								<label htmlFor='caption'>
									Caption
									<textarea
										type='text'
										name='caption'
										id='captionTextarea'
										value={this.state.caption}
										onChange={this.handleCaptionChange}
									/>
								</label>
								<label htmlFor='album'>
									Album{' '}
									<select
										value={this.state.album_id}
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
										value={this.state.tags}
										onChange={this.handleTagsChange}
									/>
								</label>
								<label htmlFor='date'>
									Date{' '}
									<input
										type='date'
										name='date'
										value={this.state.date_created}
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
