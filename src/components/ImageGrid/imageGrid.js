import React, { Component } from 'react';
import PhotoGramContext from '../../PhotoGramContext';
import Image from '../Image/image';
import './imageGrid.css';

class ImageGrid extends Component {
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
