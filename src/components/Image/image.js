import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PhotoGramContext from '../../PhotoGramContext';
import './image.css';

export default function Image(props) {
	return (
		<PhotoGramContext.Consumer>
			{context => (
				<div className='image-container'>
					<Link to={`/images/${props.id}`}>
						<img
							key={props.id}
							src={props.imgUrl}
							alt={props.alt}
							className='gridImg'
						/>
					</Link>
				</div>
			)}
		</PhotoGramContext.Consumer>
	);
}

Image.propTypes = {
	id: PropTypes.number.isRequired,
	imgUrl: PropTypes.string.isRequired,
	caption: PropTypes.string,
	date: PropTypes.string,
	onClickDelete: PropTypes.func
};
