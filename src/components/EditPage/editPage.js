import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PhotoGramContext from '../../PhotoGramContext';
import './editPage.css';

export default class EditPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			imgUrl: '',
			caption: '',
			albumId: '',
			alt: '',
			date: ''
		};
	}
	static proptTypes = {
		images: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string
			})
		)
	};
	static defaultProps = { images: [] };
	static contextType = PhotoGramContext;
	//on mount set state with current image and attributes
	componentDidMount() {
		const { images } = this.context;
		const imageId = this.props.match.params.image_id;
		const image = images.filter(img => img.id.toString() === imageId);
		console.log(image);
		this.setState({
			id: image[0].id,
			imgUrl: image[0].imgUrl,
			caption: image[0].caption,
			albumId: image[0].albumId,
			alt: image[0].alt,
			date: image[0].date
		});
	}
	//handle fomr submit event
	handleSubmit = e => {
		e.preventDefault();
		this.context.updateImage(this.state);
		this.goBack();
	};
	//set state on change for caption
	handleCaptionChange = e => {
		this.setState({
			caption: e.target.value
		});
	};
	//set state on change for album
	handleAlbumChange = e => {
		this.setState({
			albumId: e.target.value
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
	getAlbumNames(e) {
		console.log(e);
		const albums = e.map(album => (
			<option key={album.id} value={album.id}>
				{album.name}
			</option>
		));
		return albums;
	}

	render() {
		return (
			<PhotoGramContext.Consumer>
				{context => (
					<div className='edit-page-container'>
						<button type='button' id='imagePageBackBtn' onClick={this.goBack}>
							&#171;{' '}
						</button>
						<img
							key={this.state.id}
							className='imgPreveiw'
							src={this.state.imgUrl}
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
									className='uploadFormInput'
									value={this.state.albumId}
									onChange={this.handleAlbumChange}>
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
							<button type='submit' value='save'>
								Save
							</button>
							<button type='button' onClick={this.goBack}>
								Cancel
							</button>
						</form>
					</div>
				)}
			</PhotoGramContext.Consumer>
		);
	}
}
