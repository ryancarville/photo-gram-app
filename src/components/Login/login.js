import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
import config from '../../config';
import './login.css';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			redirect: false,
			error: null
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	static contextType = PhotoGramContext;
	//set state on change for email
	handleEmailChange = e => {
		this.setState({ email: e.target.value });
	};
	//set state on change for password
	handlePasswordChange = e => {
		this.setState({ password: e.target.value });
	};
	//handle form submit
	handleSubmit = e => {
		e.preventDefault();
		const user_name = this.state.email;
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
			console.log(res);
			if (!res.ok) {
				this.setState({ error: res.statusText });
			} else {
				this.setState({ redirect: true });
			}
			return null;
		});
	};

	render() {
		//redirect validation on succesful login
		const redirectToHome = this.state.redirect;
		if (redirectToHome) {
			console.log(this.state);
			const userId = this.context.state.userId;
			return <Redirect to={`/${userId}/homePage`} />;
		}
		return (
			<PhotoGramContext.Consumer>
				{context => (
					<div className='login-form-container'>
						<h3>Login</h3>
						<p>
							Use the folowing details for a valid login or try anything else to
							test validation: <br />
							<br />
							email Address: sSmith@aol.com
							<br />
							password: sue
						</p>
						<div className='errMsg-login'>{this.state.error}</div>
						<form className='login-form' onSubmit={this.handleSubmit}>
							<label htmlFor='email'>
								Email Address
								<input
									type='text'
									className='loginFormInput'
									name='email'
									id='login-email'
									onChange={this.handleEmailChange}
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
							<button
								type='submit'
								id='loginFormBtn'
								onClick={this.handleSubmit}>
								Let's Go!
							</button>
						</form>
					</div>
				)}
			</PhotoGramContext.Consumer>
		);
	}
}

export default Login;
