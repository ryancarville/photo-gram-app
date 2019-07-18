import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PhotGramContext from '../../PhotoGramContext';

class UploadProfileImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uploadRedirect: false
		};
	}
	static contextType = PhotGramContext;

	componentDidMount() {
		document.getElementById('fileToUpload').click();
	}

	handleChange = e => {
		const image = { profile_img_url: URL.createObjectURL(e.target.files[0]) };

		this.context.handleProfileImageChange(image);
		this.setState({
			uploadRedirect: true
		});
	};

	render() {
		if (this.state.uploadRedirect === true) {
			const user_id = this.context.user.id;
			return <Redirect to={`/user/${user_id}`} />;
		}
		return <input type='file' id='fileToUpload' onChange={this.handleChange} />;
	}
}

export default UploadProfileImage;
