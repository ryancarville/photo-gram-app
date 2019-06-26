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

	handleSubmit = e => {
		e.preventDefault();
		const { email, password } = e.target;
		this.setState({
			email: email.value,
			password: password.value,
			redirect: true,
			error: null
		});
		this.props.history.push(`/homePage`);
		console.log(this.state);
	};

	render() {
		const redirectToHome = this.state.redirect;
		if (redirectToHome) {
			return <Redirect to='/homePage' />;
		}
		return (
			<div className='login-form-container'>
				<h3>Login</h3>
				<form className='login-form'>
					<label htmlFor='email'>
						Email Address
						<input
							type='text'
							className='loginFormInput'
							name='email'
							id='login-email'
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
							required
						/>
					</label>
					<button type='submit' id='loginFormBtn' onSubmit={this.handleSubmit}>
						Let's Go!
					</button>
				</form>
			</div>
		);
	}
}

export default Login;
