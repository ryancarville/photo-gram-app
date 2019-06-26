import React, { Component } from 'react';
import PhotoGramContext from '../../PhotoGramContext';
import Image from '../Image/image.js';
import './imagePage.css';

class ImagePage extends Component {
	render() {
		return (
			<PhotoGramContext.Consumer>
				{context => (
					<div className='image-container'>
						<img
							key={props.id.toString()}
							src={props.imgUrl}
							alt={props.alt}
							className='gridImg'
						/>
						<p>{props.caption}</p>
						<span>Date:{props.date}</span>
						<div className='imageButtons'>
							<Link to={`/edit/${props.id}`}>Edit Post</Link>
							<button
								type='button'
								onClick={() =>
									deleteImageRequest(props.id, context.deleteImage)
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
