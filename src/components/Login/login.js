import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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

	handleEmailChange = e => {
		this.setState({ email: e.target.value });
	};

	handlePasswordChange = e => {
		this.setState({ password: e.target.value });
	};
	handleSubmit = e => {
		e.preventDefault();
		this.setState({
			redirect: true,
			error: null
		});
	};

	render() {
		const redirectToHome = this.state.redirect;
		if (redirectToHome) {
			console.log(this.state);
			return <Redirect to='/homePage' />;
		}
		return (
			<div className='login-form-container'>
				<h3>Login</h3>
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
							type='text'
							className='loginFormInput'
							name='password'
							id='login-password'
							onChange={this.handlePasswordChange}
							required
						/>
					</label>
					<button type='submit' id='loginFormBtn'>
						Let's Go!
					</button>
				</form>
			</div>
		);
	}
}

export default Login;
