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
	componentDidMount() {
		const { images } = this.context;
		const imageId = this.props.match.params.image_id;
		const image = images.filter(img => img.id.toString() === imageId);
		console.log(image);
		this.setState({
			id: image[0].id,
			imgUrl: image[0].imgUrl,
			caption: image[0].caption,
			alt: image[0].alt,
			date: image[0].date
		});
	}

	handleSubmit = e => {
		e.preventDefault();
		this.context.updateImage(this.state);
		this.goBack();
	};

	handleCaptionChange = e => {
		this.setState({
			caption: e.target.value
		});
	};

	handleDateChange = e => {
		this.setState({
			date: e.target.value
		});
	};
	handleTagsChange = e => {
		this.setState({
			alt: e.target.value
		});
	};

	goBack = e => {
		this.props.history.goBack();
	};

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
