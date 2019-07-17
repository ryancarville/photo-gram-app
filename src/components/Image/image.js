import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './image.css';

function Image(props) {
	const image_id = props.id.toString();
	const user_id = props.userId;
	return (
		<div className='image-container'>
			<Link
				to={{
					pathname: `/user/${user_id}/images/${image_id}`,
					state: {
						id: props.id,
						img_url: props.img_url,
						caption: props.caption,
						alt: props.tags,
						date: props.date_created,
						album_id: props.album_id
					}
				}}>
				<img
					key={image_id}
					src={props.img_url}
					alt={props.alt}
					className='gridImg'
				/>
			</Link>
		</div>
	);
}
export default withRouter(Image);

Image.propTypes = {
	id: PropTypes.number.isRequired,
	img_url: PropTypes.string.isRequired
};
