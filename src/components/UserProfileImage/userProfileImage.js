import React from 'react';
import { Link } from 'react-router-dom';

export default function UserProfileImage(props) {
	return (
		<Link to={`/${props.userId}/upload/profileImage`}>
			<img src={props.image} alt='' id='userPhoto' />
		</Link>
	);
}
