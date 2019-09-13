import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import { Image, Transformation } from 'cloudinary-react';

export default function UserProfileImage(props) {
	//create user profile image
	const imageUrl = props.image;
	const image = imageUrl.slice(50, imageUrl.length);

	return (
		<Link to={`/user/${props.user_id}/update-profile`}>
			<Image
				cloudName={config.CLOUDINARY_NAME}
				publicId={image}
				alt={props.user_name}
				id='userPhoto'>
				<Transformation
					height='100'
					width='100'
					crop='fill'
					radius='max'
					border='3px_solid_black'
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
