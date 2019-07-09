import React, { Component } from 'react';
import PhotoGramContext from '../../PhotoGramContext';
import Image from '../Image/image';
import './imageGrid.css';

class ImageGrid extends Component {
	static contextType = PhotoGramContext;

	render() {
		const userId = this.context.state.userId;
		const { images } = this.context;
		console.log(images);
		return (
			<section>
				<div className='grid-container'>
					{images.map(img => (
						<Image key={img.id.toString()} {...img} userId={userId} />
					))}
				</div>
			</section>
		);
	}
}

export default ImageGrid;
