import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
import PhotoGramApiService from '../../services/photoGram-api-service';
import EditPageContent from '../EditPageContent/editPageContent';
import './editPage.css';

export default class EditPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: { id: this.props.match.params.user_id },
			image_id: this.props.match.params.image_id,
			dataLoaded: false
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

	//on mount set state to surrent image data values
	componentDidMount() {
		this.getImage();
		console.log(this.props);
	}

	render() {
		const { image } = this.state;
		console.log(image);
		const user_id = this.state.user_id;
		//on successful save of data redirect to image page
		if (this.state.redirect) {
			return <Redirect to={`/user/${user_id}/images/${image.id}`} />;
		}

		const dataLoaded =
			this.state.dataLoaded === false ? (
				<div className='imageLoading'>
					<p>loading image...</p>
				</div>
			) : (
				<EditPageContent
					image={this.state.image}
					history={this.props.history}
				/>
			);
		return <>{dataLoaded}</>;
	}
}
