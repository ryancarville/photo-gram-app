import React, { Component } from 'react';
import './login.css';

class Login extends Component {
	render() {
		return (
			<div className='login-form-container'>
				<h3>Login</h3>
				<form action='image-grid.html' method='' className='login-form'>
					<label htmlFor='email'>
						Email Address
						<input
							className='loginFormInput'
							name='email'
							id='login-email'
							required
						/>
					</label>
					<label htmlFor='password'>
						Password
						<input
							className='loginFormInput'
							name='password'
							id='login-password'
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
