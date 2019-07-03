import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
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
		this.setState({
			redirect: true,
			error: null
		});
	};

	render() {
		//redirect validation on succesful login
		const redirectToHome = this.state.redirect;
		if (redirectToHome) {
			console.log(this.state);
			return <Redirect to='/homePage' />;
		}
		return (
			<PhotoGramContext.Consumer>
				{context => (
					<div className='login-form-container'>
						<h3>Login</h3>
						<p>
							This is a dummy form. Entires are required but nothing will be
							validated. Strickly for UI/UX and user flow feedback.
						</p>
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
							<button type='submit' id='loginFormBtn' onClick={context.login}>
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
