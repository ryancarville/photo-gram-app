import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import { Image, Transformation } from 'cloudinary-react';

export default function UserProfileImage(props) {
	//create user profile image
	return (
		<Link to={`/user/${props.user_id}/update-profile`}>
			<Image
				cloudName={config.CLOUDINARY_NAME}
				publicId={props.image}
				alt=''
				id='userPhoto'>
				<Transformation
					height='100'
					crop='fill'
					radius='max'
					border='2px_solid_black'
				/>
			</Image>

			<img
				src='https://beardystudios.com/Bloc_Capstone/photoGram/images/profileChangeBtn.png'
				alt='change profile button'
				id='changeProfileBtn'
			/>
		</Link>
	);
}
