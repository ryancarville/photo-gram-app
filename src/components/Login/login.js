import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
import TokenService from '../../services/token-service';
import PhotoGramApiService from '../../services/photoGram-api-service';
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
	//set context for component
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
		const credintials = { user_name, password };
		let token;
		PhotoGramApiService.login(credintials).then(data => {
			if (data.error) {
				this.setState({
					error: data.error
				});
			} else {
				token = data.authToken;
				TokenService.saveAuthToken(token);
				this.setState({
					user: {
						id: data.user_id
					}
				});

				this.setState({
					validLogin: true
				});
			}
		});
	};
	//test user login creds
	logInAsTester = e => {
		this.setState({
			user_name: 'TestUser',
			password: '1!Aa2@Bb3#Cc'
		});
	};
	//set form handler
	resetForm = e => {
		this.setState({
			user_name: '',
			password: ''
		});
	};
	render() {
		//redirect validation on succesful login
		const redirectToHome = this.state.validLogin;
		if (redirectToHome) {
			const userId = this.state.user.id;
			return <Redirect to={`/user/${userId}`} />;
		}

		return (
			<div className='login-form-container'>
				<h3>Login</h3>
				<p>
					Use the folowing details for a valid login or try anything else to
					test validation: <br />
					<button onClick={this.logInAsTester}>
						Use Test User Credientials
					</button>
				</p>
				<div className='errMsg-login'>{this.context.state.error}</div>
				<div className='errMsg-login'>{this.state.error}</div>

				<form className='login-form' onSubmit={this.handleSubmit}>
					<label htmlFor='user_name'>
						User Name
						<input
							type='text'
							className='loginFormInput'
							name='user_name'
							id='login-email'
							value={this.state.user_name}
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
							value={this.state.password}
							onChange={this.handlePasswordChange}
							required
						/>
					</label>
					<button type='submit' id='loginFormBtn' onClick={this.handleSubmit}>
						Let's Go!
					</button>
					<button type='button' onClick={this.resetForm}>
						Reset
					</button>
				</form>
			</div>
		);
	}
}

export default Login;
