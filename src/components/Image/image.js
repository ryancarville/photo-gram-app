import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PhotoGramContext from '../../PhotoGramContext';
import config from '../../config';
import './image.css';

function deleteImageRequest(imageId, cd) {
	fetch(config.API_ENDPOINT + `/${imageId}`, {
		method: 'DELETE',
		headers: {
			'content-type': 'application/json'
		}
	})
		.then(res => {
			if (!res.ok) {
				return res.json().then(error => Promise.reject(error));
			}
			return res.json();
		})
		.then(data => {
			cd(imageId);
		})
		.catch(error => {
			console.log(error);
		});
}
export default function Image(props) {
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
				</div>
			)}
		</PhotoGramContext.Consumer>
	);
}

Image.defaultProps = {
	onClickDelete: () => {}
};

Image.propTypes = {
	id: PropTypes.string.isRequired,
	imgUrl: PropTypes.string.isRequired,
	caption: PropTypes.string,
	date: PropTypes.string,
	onClickDelete: PropTypes.func
};
