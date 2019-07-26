import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
import TokenService from '../../services/token-service';
import config from '../../config';
import './login.css';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				id: null,
				name: '',
				email: '',
				user_name: '',
				photo: '',
				date_created: ''
			},
			user_name: '',
			password: '',
			validLogin: false,
			error: null
		};
	}

	static contextType = PhotoGramContext;
	//set state on change for email
	handleUserNameChange = e => {
		this.setState({ user_name: e.target.value });
	};
	//set state on change for password
	handlePasswordChange = e => {
		this.setState({ password: e.target.value });
	};
	//handle form submit
	handleSubmit = e => {
		e.preventDefault();
		const user_name = this.state.user_name;
		const password = this.state.password;
		const data = { user_name, password };
		fetch(config.API_ENDPOINT + '/login', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			},
			mode: 'cors'
		}).then(res => {
			res.json().then(data => {
				if (data.error) {
					this.setState({ error: data.error });
				} else {
					console.log(data);
					const token = data.authToken;
					TokenService.saveAuthToken(token);
					this.setState({
						user: {
							id: data.user.id,
							name: data.user.full_name,
							user_name: data.user.user_name,
							email: data.user.email,
							photo: data.user.profile_img_url,
							date_created: data.user.date_created
						},
						validLogin: true
					});
				}
			});
		});
	};

	render() {
		//redirect validation on succesful login
		const redirectToHome = this.state.validLogin;
		if (redirectToHome) {
			this.context.login(this.state.user);
			const userId = this.state.user.id;
			return <Redirect to={`/user/${userId}`} />;
		}
		return (
			<div className='login-form-container'>
				<h3>Login</h3>
				<p>
					Use the folowing details for a valid login or try anything else to
					test validation: <br />
					<br />
					user name: RCarville
					<br />
					password: 1!Aa2@Bb3#Cc
				</p>
				<div className='errMsg-login'>{this.state.error}</div>
				<form className='login-form' onSubmit={this.handleSubmit}>
					<label htmlFor='user_name'>
						User Name
						<input
							type='text'
							className='loginFormInput'
							name='user_name'
							id='login-email'
							onChange={this.handleUserNameChange}
							required
						/>
					</label>
					<label htmlFor='password'>
						Password
						<input
							type='password'
							className='loginFormInput'
							name='password'
							id='login-password'
							onChange={this.handlePasswordChange}
							required
						/>
					</label>
					<button type='submit' id='loginFormBtn' onClick={this.handleSubmit}>
						Let's Go!
					</button>
				</form>
			</div>
		);
	}
}

export default Login;
