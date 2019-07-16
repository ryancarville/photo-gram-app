import React from 'react';
import { withRouter } from 'react-router-dom';
import Image from '../Image/image';
import './imageGrid.css';

function ImageGrid(props) {
	const userId = props.userId;
	const images = props.images;
	console.log(images);
	return (
		<section>
			<div className='grid-container'>
				{images.map(img => (
					<Image key={img.id.toString()} {...img} user_id={userId} />
				))}
			</div>
		</section>
	);
}

export default withRouter(ImageGrid);
