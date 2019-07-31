import React, { useContext } from 'react';
import PhotoGramContext from '../../PhotoGramContext';
import Image from '../Image/image';
import './imageGrid.css';

function ImageGrid(props) {
	//create the image grid
	const context = useContext(PhotoGramContext);
	const images =
		context.images === undefined ? (
			<p>Loading...</p>
		) : (
			context.images.map(img => (
				<Image key={img.id.toString()} {...img} user_id={context.user.id} />
			))
		);
	return (
		<section>
			<div className='grid-container'>{images}</div>
		</section>
	);
}

export default ImageGrid;
