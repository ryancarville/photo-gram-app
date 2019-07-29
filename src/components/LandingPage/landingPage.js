import React, { Component } from 'react';
import './landingPage.css';
import PhotoGramApiService from '../../services/photoGram-api-service';

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mobile_img: '',
			desktop_img: '',
			dataReady: false,
			error: null
		};
	}
	//set landing page image
	setImage = e => {
		this.setState({
			desktop_img: e[0].desktop_img_url,
			mobile_img: e[0].mobile_img_url,
			dataReady: true
		});
	};
	//get images from database
	componentDidMount() {
		PhotoGramApiService.landingPageImage()
			.then(data => this.setImage(data))
			.catch(err => {
				console.log(err);
				this.setState({ error: err.message });
			});
	}
	render() {
		const image = (
			<>
				<img
					src={this.state.mobile_img}
					alt='account-example'
					id='mobile-example'
				/>
				<img
					src={this.state.desktop_img}
					alt='account-example'
					id='desktop-example'
				/>
			</>
		);
		const dataReady =
			this.state.dataReady === true ? image : <p>Getting Image...</p>;
		return (
			<>
				<div className='landing-content'>
					<h2>Welcome to PhotoGram!</h2>
					<h4>You're private photo platform</h4>
					<p>
						Uplaod, edit and archive your life photos without the worry of
						trolls or unauthorized usage. Easy to use and offers many options to
						organize your photo sets.{' '}
					</p>
					<div className='landing-example'>{dataReady}</div>
				</div>
			</>
		);
	}
}

export default LandingPage;
