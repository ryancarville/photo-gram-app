import React, { Component } from 'react';
import './landingPage.css';

class LandingPage extends Component {
	render() {
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
				</div>
				<div className='landing-example'>
					<img
						src='http://beardystudios.com/Bloc_Capstone/photoGram/images/landingPage-example.png'
						alt='account-example'
					/>
				</div>
			</>
		);
	}
}

export default LandingPage;
