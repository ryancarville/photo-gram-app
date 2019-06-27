import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';

import config from '../../config';
import './imagePage.css';

function deleteImageRequest(imageId, cd) {
	fetch(config.API_ENDPOINT + `/${imageId}`, {
		method: 'DELETE',
		headers: {
			'content-type': 'application/json'
		}
	})
		.then(res => {
			if (!res.ok) {
				return res.json().then(error => Promise.reject(error));
			}
			return res.json();
		})
		.then(data => {
			cd(imageId);
		})
		.catch(error => {
			console.log(error);
		});
}

export default class ImagePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			imgUrl: '',
			caption: '',
			date: '',
			error: null
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
		const { images } = this.props.context;
		const imageId = this.props.match.params.image_id;
		const image = images.filter(img => img.id.toString() === imageId);
		console.log(images);
		console.log(imageId);
		console.log(image[0]);
		this.setState({
			id: image.id,
			imgUrl: image.imgUrl,
			caption: image.caption,
			date: image.date,
			error: null
		});
		console.log(this.state);
	}
	render() {
		return (
			<PhotoGramContext.Consumer>
				{context => (
					<div className='image-container'>
						<img
							key={this.state.id}
							src={this.state.imgUrl}
							alt={this.state.alt}
							className='gridImg'
						/>
						<p>{this.state.caption}</p>
						<span>Date:{this.state.date}</span>
						<div className='imageButtons'>
							<Link to={`/edit/${this.state.id}`}>Edit Post</Link>
							<button
								type='button'
								onClick={() =>
									deleteImageRequest(this.state.id, context.deleteImage)
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
