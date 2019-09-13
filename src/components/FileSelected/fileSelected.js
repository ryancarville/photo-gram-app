import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
import './fileSelected.css';
import PhotoGramApiService from '../../services/photoGram-api-service';

export default class FileSelected extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: '',
			img_url: this.props.state.imagePreview,
			caption: '',
			tags: '',
			album_id: this.props.state.album_id,
			date_taken: '',
			makeAlbumImage: false,
			redirect: false
		};
	}
	//set context for component
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
	//set state on caption change
	handleCaptionChange = e => {
		this.setState({
			caption: e.target.value
		});
	};
	//set state on tags change
	handleTagChange = e => {
		this.setState({
			tags: e.target.value
		});
	};
	//set state on album change
	handleAlbumChange = e => {
		this.setState({
			album_id: e.target.value
		});
	};
	//set state on date change
	handleDateChange = e => {
		this.setState({
			date_taken: e.target.value
		});
	};
	//set album image state
	makeAlbumImage = e => {
		this.state.makeAlbumImage
			? this.setState({
					makeAlbumImage: false
			  })
			: this.setState({
					makeAlbumImage: true
			  });
	};
	//event handler for upload
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
		const newImage = {
			user_id,
			img_url,
			caption,
			tags,
			date_created,
			album_id
		};
		const id = album_id;
		const newAlbumImage = { id, img_url };
		if (this.state.makeAlbumImage) {
			PhotoGramApiService.updateAlbum(newAlbumImage);
		}
		PhotoGramApiService.uploadImage(newImage).then(
			this.setState({
				redirect: true
			})
		);
	};

	//on mnount set state with user id
	componentDidMount() {
		this.setState({
			user_id: this.context.user.id
		});
	}
	render() {
		//on successful upload redirect to home page
		if (this.state.redirect === true) {
			const user_id = this.state.user_id;
			return <Redirect to={`/user/${user_id}`} />;
		}
		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		if (month < 10) month = '0' + month;
		if (day < 10) day = '0' + day;
		var today = year + '-' + month + '-' + day;

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
										value={this.state.album_id}
										onChange={this.handleAlbumChange}>
										<option value='0'>No Album</option>
										{this.getAlbumNames(context.albums)}
									</select>
								</label>
								<label htmlFor='makeAlbumImage'>
									Make Album Image
									<input type='checkbox' onChange={this.makeAlbumImage} />
								</label>
								<label htmlFor='date'>
									Date Taken{' '}
									<input
										className='uploadFormInput'
										type='date'
										name='date'
										id='dateForImage'
										value={today}
										onChange={this.handleDateChange}
									/>
								</label>
								<button
									type='submit'
									value='Upload Image'
									name='submit'
									id='uploadFormBtn'>
									Upload Image
								</button>
								<button
									type='button'
									value='Cancel'
									name='returnHome'
									id='returnHomeBtn'
									onClick={this.props.handleGoHome}>
									Cancel
								</button>
							</form>
						</div>
					</>
				)}
			</PhotoGramContext.Consumer>
		);
	}
}
