import React from 'react';
import PhotoGramContext from '../../PhotoGramContext';
import Image from '../Image/image';
import './imageGrid.css';

function ImageGrid(props) {
	return (
		<PhotoGramContext.Consumer>
			{context => (
				<section>
					<div className='grid-container'>
						{context.images.map(img => (
							<Image
								key={img.id.toString()}
								{...img}
								user_id={context.user.id}
							/>
						))}
					</div>
				</section>
			)}
		</PhotoGramContext.Consumer>
	);
}

export default ImageGrid;
