import React from 'react';
import { Link } from 'react-router-dom';

export default function UserProfileImage(props) {
	//create user profile image
	return (
		<Link to={`/user/${props.user_id}/update-profile`}>
			<img src={props.image} alt='' id='userPhoto' />
			<img
				src='http://beardystudios.com/Bloc_Capstone/photoGram/images/profileChangeBtn.png'
				alt='change profile button'
				id='changeProfileBtn'
			/>
		</Link>
	);
}
