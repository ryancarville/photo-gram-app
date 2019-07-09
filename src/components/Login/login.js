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
		const { users } = this.context;
		const loginEmail = this.state.email;
		const loginPass = this.state.password;
		const validUser = users.filter(
			usr => usr.email === loginEmail && usr.password === loginPass
		);
		console.log(validUser);
		if (validUser == 0) {
			this.setState({
				error: 'Not a valid Email Address'
			});
		} else {
			const userId = validUser[0].id;
			console.log(userId);
			this.context.login(userId);
			// this.setState({
			// 	userId: userId,
			// 	redirect: true,
			// 	error: null
			// });
		}
	};

	render() {
		//redirect validation on succesful login
		const redirectToHome = this.context.state.validLogin;
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
							This is a dummy form. Entires are required but nothing will be
							validated. Strickly for UI/UX and user flow feedback.
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
									type='text'
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
