import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import PhotoGramContext from '../../PhotoGramContext';
import PhotoGramApiService from '../../services/photoGram-api-service';
import { Image, Transformation } from 'cloudinary-react';
import config from '../../config';
import './updateProfile.css';

class UpdateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uploadedImage: '',
			user_id: this.props.match.params.user_id,
			full_name: '',
			user_name: '',
			profile_img_url: '',
			redirect: false,
			widget: window.cloudinary.createUploadWidget(
				{
					cloudName: config.CLOUDINARY_NAME,
					uploadPreset: config.CLOUDINARY_PROFILE_UPLOAD_PRESET,
					cropping: 'server'
				},
				(error, result) => {
					if (!error && result && result.event === 'success') {
						console.log('Done! Here is the image info: ', result.info);
						this.setState(
							{
								uploadedImage: result.info.public_id,
								profile_img_url:
									'https://res.cloudinary.com/rcarville/image/upload/' +
									result.info.public_id
							},
							() => {
								console.log(this.state);
							}
						);
					}
				}
			)
		};
		this.getUserInfo = () => {
			const user = { id: this.state.user_id };
			this.context.checkIfLoggedIn(user).then(() => {
				this.setState({
					full_name: this.context.user.name,
					user_name: this.context.user.user_name,
					profile_img_url: this.context.user.photo,
					uploadedImage: this.context.user.photo.substring(50),
					context: this.context
				});
			});
		};
	}
	static contextType = PhotoGramContext;
	//handle name input event change
	handleNameChange = e => {
		this.setState({
			full_name: e.target.value
		});
	};
	//handle user name input event change
	handleUserNameChange = e => {
		this.setState({
			user_name: e.target.value
		});
	};
	//handle submit
	handleSubmit = e => {
		e.preventDefault();
		const { full_name, user_name, profile_img_url } = this.state;
		const newUserInfo = { full_name, user_name, profile_img_url };
		const user_id = this.state.user_id;
		PhotoGramApiService.updateUserInfo(user_id, newUserInfo)
			.then(data => {
				this.context.setAppStateUser(data);
			})
			.then(this.setState({ redirect: true }));
	};
	//handle open image upload widget
	openWidget = () => {
		this.state.widget.open();
	};
	//handle back event
	goHome = e => {
		this.props.history.goBack();
	};
	//on mount set the component state with current user data
	componentWillMount() {
		this.getUserInfo();
	}
	render() {
		//redirect to home page on successful save
		if (this.state.redirect) {
			const user_id = this.state.user_id;
			return <Redirect to={`/user/${user_id}`} />;
		}
		return (
			<PhotoGramContext.Consumer>
				{context => (
					<div className='updateProfile'>
						<Dropzone
							id='direct-upload-dropzone'
							disableClick={true}
							multiple={false}
							accept='image/*'
							style={{ position: 'relative' }}
							onDrop={this.onDrop}>
							{() => (
								<div id='profile_update'>
									<h1>Update Profile Info</h1>
									<h2>
										You can change your Full Name, User Name or Profile Image
									</h2>

									<form onSubmit={this.handleSubmit}>
										<div className='form_line'>
											<label path='full_name'>Name:</label>
											<div className='form_controls'>
												<input
													type='text'
													className='form-control'
													value={this.state.full_name}
													placeholder={context.user.name}
													onChange={this.handleNameChange}
												/>
											</div>
										</div>
										<div className='form_line'>
											<label path='user_name'>User Name:</label>
											<div className='form_controls'>
												<input
													type='text'
													className='form-control'
													value={this.state.user_name}
													placeholder={context.user.user_name}
													onChange={this.handleUserNameChange}
												/>
											</div>
										</div>
										<div className='form_line'>
											<label htmlFor='fileUpload'>Upload Image</label>
											<div className='form_control'>
												<Image
													cloudName={config.CLOUDINARY_NAME}
													publicId={this.state.uploadedImage}>
													<Transformation
														height='100'
														width='100'
														crop='scale'
														radius='100'
													/>
												</Image>
												<br />
												<button
													type='button'
													id='fileUplaod'
													onClick={this.openWidget}>
													Upload Image
												</button>
											</div>
										</div>
										<button type='submit'>Save Changes</button>
										<button type='button' onClick={this.goHome}>
											Cancel
										</button>
									</form>
								</div>
							)}
						</Dropzone>
					</div>
				)}
			</PhotoGramContext.Consumer>
		);
	}
}

export default UpdateProfile;
