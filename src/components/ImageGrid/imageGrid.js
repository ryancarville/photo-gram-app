import React, { useContext } from 'react';
import PhotoGramContext from '../../PhotoGramContext';
import Image from '../Image/image';
import './imageGrid.css';

function ImageGrid(props) {
	const context = useContext(PhotoGramContext);
	return (
		<section>
			<div className='grid-container'>
				{context.images.map(img => (
					<Image key={img.id.toString()} {...img} user_id={context.user.id} />
				))}
			</div>
		</section>
	);
}

export default ImageGrid;
