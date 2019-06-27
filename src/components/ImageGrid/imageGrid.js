import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PhotoGramContext from '../../PhotoGramContext';
import Image from '../Image/image';
import './imageGrid.css';

class ImageGrid extends Component {
	static proptTypes = {
		images: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string
			})
		)
	};
	static defaultProps = { images: [] };

	static contextType = PhotoGramContext;

	render() {
		const { images } = this.context;
		console.log(images);
		return (
			<section>
				<div className='grid-container'>
					{images.map(img => (
						<Image key={img.id.toString()} {...img} />
					))}
				</div>
			</section>
		);
	}
}

export default ImageGrid;
