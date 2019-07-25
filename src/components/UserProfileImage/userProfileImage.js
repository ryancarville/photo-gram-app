import React from 'react';
import { Link } from 'react-router-dom';

export default function UserProfileImage(props) {
	return (
		<Link to={`/user/${props.user_id}/upload/profileImage`}>
			<img src={props.image} alt='' id='userPhoto' />
			<img
				src='http://beardystudios.com/Bloc_Capstone/photoGram/images/profileChangeBtn.png'
				alt='change profile button'
				id='changeProfileBtn'
			/>
		</Link>
	);
}
