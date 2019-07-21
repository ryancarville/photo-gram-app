import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import PhotoGramContext from '../../PhotoGramContext';
import config from '../../config';

class UploadProfileImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			widget: window.cloudinary.createUploadWidget(
				{
					cloudName: config.CLOUDINARY_NAME,
					uploadPreset: config.CLOUDINARY_UPLOAD_PRESET
				},
				(error, result) => {
					if (!error && result && result.event === 'success') {
						console.log('Done! Here is the image info: ', result.info);
					}
				}
			),
			full_name: '',
			user_name: '',
			file: [],
			uploadRedirect: false
		};
		this.onDrop = file => {
			this.setState({ file });
		};
		this.photoId = 1;
	}

	static contextType = PhotoGramContext;

	handleImageChange = e => {
		const image = { profile_img_url: URL.createObjectURL(e.target.files[0]) };
		this.context.handleUserInfoChange(image);
		this.setState({
			uploadRedirect: true
		});
	};
	handleNameChange = e => {
		this.setState({
			full_name: e.targe.value
		});
	};
	handleUserNameChange = e => {
		this.setState({
			user_name: e.targe.value
		});
	};
	handleSubmit = e => {
		e.preventDefault();
	};
	openWidget = () => {
		this.state.widget.open();
	};
	render() {
		if (this.state.uploadRedirect === true) {
			const user_id = this.context.user.id;
			return <Redirect to={`/user/${user_id}`} />;
		}

		return (
			<PhotoGramContext.Consumer>
				{context => (
					<div>
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
										You can hange your profile image, User name or Full Name
									</h2>
									<p>
										You can also drag and drop an image file into the dashed
										area.
									</p>
									<form onSubmit={this.handleSubmit}>
										<div className='form_line'>
											<label path='full_name'>Name:</label>
											<div className='form_controls'>
												<input
													type='text'
													ref={nameEl => (this.nameEl = nameEl)}
													className='form-control'
													value={context.user.name}
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
													ref={user_nameEl => (this.user_nameEl = user_nameEl)}
													className='form-control'
													value={context.user.user_name}
													placeholder={context.user.user_name}
													onChange={this.handleUserNameChange}
												/>
											</div>
										</div>
										<div className='form_line'>
											<label htmlFor='fileUpload'>Upload Image</label>
											<div className='form_control'>
												<input
													type='file'
													id='fileUplaod'
													multiple={false}
													accpets='images/*'
													ref={fileInputEl => (this.fileInputEl = fileInputEl)}
													onClick={this.openWidget}
												/>
											</div>
										</div>
										<button type='submit'>Save Changes</button>
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

export default UploadProfileImage;
