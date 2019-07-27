import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
import './imagePage.css';
import PhotoGramApiService from '../../services/photoGram-api-service';

export default class ImagePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: this.props.match.params.user_id,
			image_id: this.props.match.params.image_id,
			image: {},
			redirect: false
		};
	}

	static contextType = PhotoGramContext;

	//handle back event
	goHome = e => {
		const user_id = this.state.user_id;
		this.props.history.push(`/user/${user_id}`);
	};
	//delete request event handle sent to context
	deleteImageRequest = imageId => {
		PhotoGramApiService.deleteImage(imageId)
			.then(data => this.context.updateImagesOnDelete(imageId))
			.then(
				setTimeout(() => {
					this.setState({
						redirect: true
					});
				}, 1000)
			);
	};

	formatDate = image => {
		const date = new Date(image.date_created);
		const formatted_date = new Intl.DateTimeFormat('en-GB').format(date);
		return formatted_date;
	};

	componentWillMount() {
		const image_id = this.state.image_id;
		const image = this.context.getImageData(image_id);
		console.log(image);
		this.setState({
			image: image
		});
	}

	render() {
		if (this.state.redirect) {
			const user_id = this.state.user_id;
			return <Redirect to={`/user/${user_id}`} />;
		}
		const user_id = this.state.user_id;
		const image_id = this.state.image_id;
		const image = this.state.image;

		return (
			<PhotoGramContext.Consumer>
				{context => (
					<>
						<button type='button' id='imagePageBackBtn' onClick={this.goHome}>
							&#171;{' '}
						</button>
						<div className='image-page-container'>
							<img
								key={image.id}
								src={image.img_url}
								alt={image.alt}
								className='singleImg'
							/>
							<div className='image-info'>
								<p>{image.caption}</p>
								<span>Date: {this.formatDate(image)}</span>

								<div className='imageButtons'>
									<Link to={`/user/${user_id}/edit/${image_id}`}>
										<button type='button'>Edit Post</button>
									</Link>
									<button
										type='button'
										onClick={() => this.deleteImageRequest(image_id)}>
										Delete
									</button>
								</div>
							</div>
						</div>
					</>
				)}
			</PhotoGramContext.Consumer>
		);
	}
}
