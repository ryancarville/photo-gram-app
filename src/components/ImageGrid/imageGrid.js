import React, { Component } from 'react';
import STORE from '../../STORE/store';
import './imageGrid.css';

class ImageGrid extends Component {
	render() {
		const images = STORE.map(img => {
			console.log(img.imgUrl);
			return (
				<img src={img.imgUrl} alt={img.name} key={img.id} className='gridImg' />
			);
		});

		return <div className='grid-container'>{images}</div>;
	}
}

export default ImageGrid;
