import React, { Component } from 'react';
import './landingPage.css';

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			camera_img: '',
			lock_img: '',
			dataReady: false,
			error: null
		};
	}
	//set landing page image
	setImage = e => {
		this.setState({
			lock_img:
				'https://beardystudios.com/Bloc_Capstone/photoGram/images/lock.png',
			camera_img:
				'https://beardystudios.com/Bloc_Capstone/photoGram/images/camera.png',
			dataReady: true
		});
	};
	//get images from database
	componentDidMount() {
		this.setImage();
	}
	render() {
		const image = (
			<div className='cameraLockImage'>
				<img src={this.state.camera_img} alt='account-example' id='camera' />
				<img src={this.state.lock_img} alt='account-example' id='lock' />
			</div>
		);
		const dataReady =
			this.state.dataReady === true ? image : <p>Getting Image...</p>;
		return (
			<>
				<div className='landing-content'>
					<div className='landingText'>
						<h2>Welcome to PhotoGram!</h2>
						<h4>You're private photo platform</h4>
						<p>
							Upload, edit and archive your life photos without the worry of
							trolls or unauthorized usage. Easy to use and offers many options
							to organize your photo sets.{' '}
						</p>
					</div>
					<div className='landing-example'>{dataReady}</div>
				</div>
			</>
		);
	}
}

export default LandingPage;
