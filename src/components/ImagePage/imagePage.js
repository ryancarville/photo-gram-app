import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
import './imagePage.css';
import PhotoGramApiService from '../../services/photoGram-api-service';

export default class ImagePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: this.props.match.params.user_id,
			image_id: this.props.match.params.image_id,
			image: null,
			dataLoaded: false,
			redirect: false
		};
	}
	//set context for component
	static contextType = PhotoGramContext;
	//handle back event
	goHome = e => {
		const user_id = this.state.user_id;
		this.props.history.push(`/user/${user_id}`);
	};
	//delete request event handler
	deleteImageRequest = imageId => {
		PhotoGramApiService.deleteImage(imageId)
			.then(data => this.context.updateImagesOnDelete(imageId))
			.then(
				setTimeout(() => {
					this.setState({
						redirect: true
					});
				}, 1000)
			);
	};
	//format date handler
	formatDate = imageDate => {
		const date = new Date(imageDate);
		console.log(date);
		const formatted_date = new Intl.DateTimeFormat('en-GB').format(date);
		return formatted_date;
	};
	//set component state to select image data
	componentDidMount() {
		const user = { id: this.state.user_id };
		this.context.checkIfLoggedIn(user);
		console.log('imagePage check log in ran');
		const selectedImage = this.context.getImageData(this.state.image_id);
		console.log(selectedImage);
		this.setState(
			{
				image: selectedImage,
				dataLoaded: true
			},
			() => {
				console.log(this.state.image);
			}
		);
	}
	imageLoaded = () => {
		const { user_id, image_id, image } = this.state;
		return (
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
						<span>Date: {this.formatDate(image.date_created)}</span>

						<div className='imageButtons'>
							<Link to={`/user/${user_id}/edit/${image_id}`}>
								<button type='button'>Edit Post</button>
							</Link>
							<button
								type='button'
								onClick={() => this.deleteImageRequest(image_id)}>
								Delete
							</button>
						</div>
					</div>
				</div>
			</>
		);
	};
	imageNotLoaded = () => {
		return <p>loading image...</p>;
	};
	render() {
		//redirect to home page on succesful delete request
		if (this.state.redirect) {
			const user_id = this.state.user_id;
			return <Redirect to={`/user/${user_id}`} />;
		}

		return (
			<>
				{this.state.dataLoaded === false
					? this.imageNotLoaded
					: this.imageLoaded}
			</>
		);
	}
}
