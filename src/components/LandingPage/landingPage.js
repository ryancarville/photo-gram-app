import React, { Component } from 'react';
import ImageGrid from '../ImageGrid/imageGrid';
import './landingPage.css';

class LandingPage extends Component {
	render() {
		return (
			<>
				<div className='landing-content'>
					<h2>Welcome to PhotoGram!</h2>
					<h4>You're private photo platform</h4>
					<p>
						You can uplaod, edit and archive your life photos without the worry
						of trolls or unauthorized usage. Easy to use and offers many options
						to organize your photo sets.{' '}
					</p>
				</div>
				<ImageGrid />
			</>
		);
	}
}

export default LandingPage;
