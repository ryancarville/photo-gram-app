import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
import './imagePage.css';

export default class ImagePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: this.props.match.params.user_id,
			image_id: this.props.match.params.image_id
		};
	}

	static contextType = PhotoGramContext;

	//handle back event
	goHome = e => {
		const user_id = this.state.user_id;
		this.props.history.push(`/user/${user_id}`);
	};
	//delete request event handle sent to context
	deleteImageRequest = (imageId, cd) => {
		cd(imageId);
	};

	render() {
		const image_id = this.state.image_id;
		const user_id = this.state.user_id;
		const image = this.context.getImageData(image_id);

		console.log(image);
		return (
			<PhotoGramContext.Consumer>
				{context => (
					<>
						<button type='button' id='imagePageBackBtn' onClick={this.goHome}>
							&#171;{' '}
						</button>
						<div className='image-page-container'>
							<img
								key={image.id}
								src={image.img_url}
								alt={image.alt}
								className='singleImg'
							/>
							<div className='image-info'>
								<p>{image.caption}</p>
								<span>Date:{image.date_created}</span>

								<div className='imageButtons'>
									<Link
										to={{
											pathname: `/user/${user_id}/edit/${image_id}`,
											state: { image }
										}}>
										<button type='button'>Edit Post</button>
									</Link>
									<button
										type='button'
										onClick={() =>
											this.deleteImageRequest(image_id, context.deleteImage)
										}>
										Delete
									</button>
								</div>
							</div>
						</div>
					</>
				)}
			</PhotoGramContext.Consumer>
		);
	}
}
