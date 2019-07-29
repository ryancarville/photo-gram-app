import React from 'react';
import { Link } from 'react-router-dom';
import './image.css';

function Image(props) {
	const image_id = props.id.toString();
	const user_id = props.user_id;

	return (
		<div className='image-container'>
			<Link to={`/user/${user_id}/images/${image_id}`}>
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
export default Image;
