import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
import config from '../../config';
import './fileSelected.css';

export default class FileSelected extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: '',
			img_url: this.props.state.imagePreview,
			caption: '',
			tags: '',
			album_id: null,
			date_taken: '',
			redirect: false
		};
	}

	static contextType = PhotoGramContext;
	//get all albums in context array
	getAlbumNames = e => {
		const albums = e.map(album => (
			<option key={album.id} value={album.id}>
				{album.album_name}
			</option>
		));
		return albums;
	};

	handleCaptionChange = e => {
		this.setState({
			caption: e.target.value
		});
	};
	handleTagChange = e => {
		this.setState({
			tags: e.target.value
		});
	};
	handleAlbumChange = e => {
		this.setState({
			album_id: e.target.value
		});
	};
	handleDateChange = e => {
		this.setState({
			date_taken: e.target.value
		});
	};

	handleUpload = e => {
		e.preventDefault();
		const {
			user_id,
			img_url,
			caption,
			tags,
			date_created,
			album_id
		} = this.state;
		console.log(user_id);
		const data = { user_id, img_url, caption, tags, date_created, album_id };
		fetch(config.API_ENDPOINT + `/upload/${user_id}`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			},
			mode: 'cors'
		})
			.then(this.context.refreshState())
			.then(
				this.setState({
					redirect: true
				})
			);
	};
	componentDidMount() {
		this.setState({
			user_id: this.context.user.id
		});
	}

	render() {
		if (this.state.redirect === true) {
			return <Redirect to={`/user/${this.state.user_id}`} />;
		}
		return (
			<PhotoGramContext.Consumer>
				{context => (
					<>
						<div className='uploadFormContainer'>
							<img
								src={this.state.img_url}
								className='uploadImgPreview'
								alt=''
							/>
							<form
								className='imageUploadForm'
								encType='multipart/form-data'
								onSubmit={this.handleUpload}>
								<label htmlFor='comments'>
									{' '}
									Caption
									<textarea
										className='uploadFormInput'
										name='comments'
										id='commentsForImage'
										onChange={this.handleCaptionChange}
									/>
								</label>
								<label htmlFor='tags'>
									Tags{' '}
									<input
										className='uploadFormInput'
										type='text'
										name='tags'
										id='tagsForImage'
										onChange={this.handleTagChange}
									/>
								</label>
								<label htmlFor='album'>
									Album{' '}
									<select
										className='uploadFormInput'
										onChange={this.handleAlbumChange}>
										<option value=''>No Album</option>
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
										onChange={this.handleDateChange}
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
									onClick={this.props.handleGoHome}
								/>
							</form>
						</div>
					</>
				)}
			</PhotoGramContext.Consumer>
		);
	}
}
