import React, { Component } from 'react';
import PhotoGramContext from '../../PhotoGramContext';
import config from '../../config';
import './editPage.css';

export default class EditPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.location.state.id,
			img_url: this.props.location.state.img_url,
			alt: this.props.location.state.tags,
			caption: this.props.location.state.caption,
			date_created: this.props.location.state.date,
			album_id: this.props.location.state.album_id
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
			date: e.target.value
		});
	};
	//set state on change for tags
	handleTagsChange = e => {
		this.setState({
			alt: e.target.value
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
		const { id, img_url, caption, alt, album_id, date_created } = this.state;
		const data = { id, img_url, caption, alt, album_id, date_created };
		fetch(config.API_ENDPOINT + `/images/${id}`, {
			method: 'PATCH',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			}
		});
		this.context.updateImage(id);
	};

	render() {
		return (
			<PhotoGramContext.Consumer>
				{context => (
					<>
						<button type='button' id='imagePageBackBtn' onClick={this.goBack}>
							&#171;{' '}
						</button>
						<div className='edit-page-container'>
							<img
								key={this.state.id}
								className='imgPreview'
								src={this.state.img_url}
								alt={this.state.alt}
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
										value={this.state.alt}
										onChange={this.handleTagsChange}
									/>
								</label>
								<label htmlFor='date'>
									Date{' '}
									<input
										type='date'
										name='date'
										value={this.state.date}
										onChange={this.handleDateChange}
									/>
								</label>
								<div className='imageEditFormBtnContainer'>
									<button type='submit' value='save'>
										Save
									</button>
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
