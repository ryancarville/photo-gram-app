import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './image.css';

function Image(props) {
	const image_id = props.id;
	const user_id = props.user_id;
	return (
		<div className='image-container'>
			<Link to={`/users/${user_id}/images/${image_id}`}>
				<img
					key={image_id.toString()}
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
	img_url: PropTypes.string.isRequired,
	caption: PropTypes.string,
	date: PropTypes.string,
	onClickDelete: PropTypes.func
};
