import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PhotoGramContext from '../../PhotoGramContext';
import Image from '../Image/image';
import './albumPage.css';

export default class AlbumPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			albumImages: [],
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
		const { images } = this.context;
		const albumId = this.props.match.params.album_id;
		const albumImgs = images.filter(img => img.albumId === albumId);
		this.setState({
			albumImages: albumImgs
		});
		console.log(images);
		console.log(albumId);
	}

	getImages = e => {
		const { albumImages } = this.state.albumImages;
		albumImages.map(img => <Image key={img.id.toString()} {...img} />);
	};
	handleBack = e => {
		this.props.history.goBack();
	};

	deleteImageRequest = (imageId, cd) => {
		cd(imageId);
		this.handleBack();
	};

	render() {
		return (
			<section>
				<div className='grid-container'>{this.getImages}</div>
			</section>
		);
	}
}
