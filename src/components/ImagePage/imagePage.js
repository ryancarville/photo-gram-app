import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
import './imagePage.css';
import PhotoGramApiService from '../../services/photoGram-api-service';
import ImageContent from '../ImageContent/imageContent';

export default class ImagePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: { id: this.props.match.params.user_id },
			image_id: this.props.match.params.image_id,
			image: {},
			dataLoaded: false,
			redirect: false
		};
		this.getImage = () => {
			console.log('get image ran');
			this.context
				.checkIfLoggedIn(this.state.user)
				.then(() => {
					return this.context.getImageData(this.state.image_id);
				})
				.then(selectedImage =>
					this.setState(
						{
							image: selectedImage,
							dataLoaded: true
						},
						() => {
							console.log('image ready = ' + this.state.dataLoaded);
						}
					)
				);
		};
	}

	static contextType = PhotoGramContext;

	//handle back event
	goHome = e => {
		const user_id = this.state.user.id;
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
		const formatted_date = new Intl.DateTimeFormat('en-US').format(date);
		return formatted_date;
	};
	//set component state to select image data
	componentDidMount() {
		this.getImage();
	}

	render() {
		//redirect to home page on succesful delete request
		if (this.state.redirect) {
			const user_id = this.state.user_id;
			return <Redirect to={`/user/${user_id}`} />;
		}

		const dataLoaded =
			this.state.dataLoaded === false ? (
				<div className='imageLoading'>
					<p>loading image...</p>
				</div>
			) : (
				<ImageContent
					image={this.state.image}
					user={this.state.user}
					formatDate={this.formatDate}
					deleteImageRequest={this.deleteImageRequest}
					goHome={this.goHome}
				/>
			);

		return <>{dataLoaded}</>;
	}
}
