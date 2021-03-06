import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './image.css';

function Image(props) {
	//create individual image
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
export default withRouter(Image);
