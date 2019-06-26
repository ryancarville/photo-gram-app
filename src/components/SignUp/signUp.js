import React, { Component } from 'react';
import './signUp.css';

class SignUp extends Component {
	render() {
		return (
			<div className='reg-form' id='newUserForm'>
				<h3>SignUp Today!</h3>
				<form action='image-grid.html' method='' className='signupForm'>
					<label htmlFor='full-name'>
						Full Name
						<input
							className='signupFormInput'
							name='full-name'
							id='reg-full-name'
							required
						/>
					</label>
					<label htmlFor='email'>
						Email Address
						<input
							className='signupFormInput'
							name='email'
							id='reg-email'
							required
						/>
					</label>
					<label htmlFor='password'>
						Password
						<input
							className='signupFormInput'
							name='password'
							id='reg-password'
							required
						/>
					</label>
					<button type='submit' id='signupFormBtn'>
						Let's Go!
					</button>
				</form>
			</div>
		);
	}
}

export default SignUp;
