import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
//import config from '../../config';
import './imagePage.css';

// function deleteImageRequest(imageId, cd) {
// 	cd(imageId);

// fetch(config.API_ENDPOINT + `/${imageId}`, {
// 	method: 'DELETE',
// 	headers: {
// 		'content-type': 'application/json'
// 	}
// })
// 	.then(res => {
// 		if (!res.ok) {
// 			return res.json().then(error => Promise.reject(error));
// 		}
// 		return res.json();
// 	})
// 	.then(data => {
// 		cd(imageId);
// 	})
// 	.catch(error => {
// 		console.log(error);
// 	});
// }

export default class ImagePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			imgUrl: '',
			alt: '',
			caption: '',
			date: '',
			error: null
		};
	}
	static proptTypes = {
		images: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number,
				imgUrl: PropTypes.string,
				caption: PropTypes.string,
				albumId: PropTypes.string,
				date: PropTypes.string,
				onClickDelete: PropTypes.func
			})
		)
	};
	static defaultProps = { images: [] };
	static contextType = PhotoGramContext;

	componentDidMount() {
		const { images } = this.context;
		const imageId = this.props.match.params.image_id;
		const image = images.filter(img => img.id.toString() === imageId);
		console.log(image[0]);
		this.setState({
			id: image[0].id,
			imgUrl: image[0].imgUrl,
			alt: image[0].alt,
			caption: image[0].caption,
			date: image[0].date,
			error: null
		});
	}

	handleBack = e => {
		this.props.history.goBack();
	};

	deleteImageRequest = (imageId, cd) => {
		cd(imageId);
		this.handleBack();
	};

	render() {
		return (
			<PhotoGramContext.Consumer>
				{context => (
					<div className='image-page-container'>
						<button
							type='button'
							id='imagePageBackBtn'
							onClick={this.handleBack}>
							&#171;{' '}
						</button>
						<img
							key={this.state.id}
							src={this.state.imgUrl}
							alt={this.state.alt}
							className='singleImg'
						/>
						<p>{this.state.caption}</p>
						<span>Date:{this.state.date}</span>
						<div className='imageButtons'>
							<Link to={`/edit/${this.state.id}`}>
								<button type='button'>Edit Post</button>
							</Link>
							<button
								type='button'
								onClick={() =>
									this.deleteImageRequest(this.state.id, context.deleteImage)
								}>
								Delete
							</button>
						</div>
					</div>
				)}
			</PhotoGramContext.Consumer>
		);
	}
}

ImagePage.defaultProps = {
	onClickDelete: () => {}
};

ImagePage.propTypes = {
	id: PropTypes.number.isRequired,
	imgUrl: PropTypes.string.isRequired,
	caption: PropTypes.string,
	albumId: PropTypes.string,
	date: PropTypes.string,
	onClickDelete: PropTypes.func
};
