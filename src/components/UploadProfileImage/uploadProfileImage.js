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
		const image = URL.createObjectURL(e.target.files[0]);
		this.context.handleProfileImageChange(image);
		this.setState({
			uploadRedirect: true
		});
	};

	render() {
		if (this.state.uploadRedirect === true) {
			const userId = this.context.state.userId;
			return <Redirect to={`/${userId}/homepage`} />;
		}
		return <input type='file' id='fileToUpload' onChange={this.handleChange} />;
	}
}

export default UploadProfileImage;
