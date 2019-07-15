import React, { Component } from 'react';
import config from '../../config';
import './landingPage.css';

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mobile_img: '',
			desktop_img: '',
			error: null
		};
	}
	setImage = e => {
		this.setState({
			desktop_img: e[0].desktop_img_url,
			mobile_img: e[0].mobile_img_url
		});
	};
	componentDidMount() {
		fetch(config.API_ENDPOINT, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) {
					res.json().then(err => Promise.reject(err));
				}
				return res.json();
			})
			.then(res => this.setImage(res))
			.catch(err => {
				console.log(err);
				this.setState({ error: err.message });
			});
	}
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
					<div className='landing-example'>
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
					</div>
				</div>
			</>
		);
	}
}

export default LandingPage;
