import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
import './signUp.css';
import PhotoGramApiService from '../../services/photoGram-api-service';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			full_name: '',
			email: '',
			user_name: '',
			password: '',
			reEnterPass: '',
			passwordError: null,
			error: null
		};
	}
	//set context for component
	static contextType = PhotoGramContext;
	//set state on change for name
	handleNameChange = e => {
		this.setState({
			full_name: e.target.value
		});
	};
	//set state on change for email
	handleEmailChange = e => {
		this.setState({
			email: e.target.value
		});
	};
	//set state for user name
	handleUserNameChange = e => {
		this.setState({
			user_name: e.target.value
		});
	};
	//set state on change for password
	handlePasswordChange = e => {
		this.setState({
			password: e.target.value
		});
		if (e.target.value === '') {
			this.setState({
				reEnterPass: ''
			});
		}
	};
	//ensure password match
	handlePasswordMatch = e => {
		this.setState(
			{
				reEnterPass: e.target.value
			},
			() => {
				if (this.state.reEnterPass === '') {
					this.setState({
						passwordError: null
					});
				} else if (this.state.reEnterPass !== this.state.password) {
					this.setState({
						passwordError: 'Passwords do not match'
					});
				}
			}
		);

		if (e.target.value === this.state.password) {
			this.setState({
				passwordError: null
			});
		}
	};

	//reset state on form reset
	resetState = e => {
		this.setState({
			full_name: '',
			email: '',
			user_name: '',
			password: '',
			reEnterPass: '',
			passwordError: '',
			error: null
		});
	};
	//handle form submit
	handleSubmit = (e, cd) => {
		e.preventDefault();

		const newUser = {
			full_name: this.state.full_name,
			email: this.state.email,
			user_name: this.state.user_name,
			password: this.state.password
		};
		PhotoGramApiService.signUp(newUser).then(data => {
			if (data.error) {
				this.setState({ error: data.error });
			} else {
				this.setState({
					redirect: true
				});
			}
		});
	};
	render() {
		//if signup successful redirect to login
		if (this.state.redirect) {
			return <Redirect to='/login' />;
		}
		return (
			<PhotoGramContext.Consumer>
				{context => (
					<div className='reg-form' id='newUserForm'>
						<h3>SignUp Today!</h3>
						<div>{this.state.error}</div>
						<form onSubmit={e => this.handleSubmit(e)} className='signupForm'>
							<label htmlFor='full-name'>Full Name</label>
							<input
								type='text'
								className='signupFormInput'
								name='full-name'
								id='reg-full-name'
								onChange={this.handleNameChange}
								required
							/>

							<label htmlFor='email'>Email Address</label>
							<input
								type='text'
								className='signupFormInput'
								name='email'
								id='reg-email'
								onChange={this.handleEmailChange}
								required
							/>

							<label htmlFor='user_name'>User Name</label>
							<input
								type='text'
								className='signupFormInput'
								name='user_name'
								id='reg-user-name'
								onChange={this.handleUserNameChange}
								required
							/>

							<label htmlFor='password'>Password</label>
							<input
								type='password'
								className='signupFormInput'
								name='password'
								value={this.state.password}
								id='reg-password'
								onChange={this.handlePasswordChange}
								required
							/>

							<label htmlFor='password'>Re-Enter Password</label>
							<input
								type='password'
								className='signupFormInput'
								name='password'
								value={this.state.reEnterPass}
								id='reg-reEnter-password'
								onChange={this.handlePasswordMatch}
								required
							/>
							<div className='signUpError' color='red'>
								{this.state.passwordError}
							</div>
							<button type='submit' id='signupFormSubmit'>
								Let's Go!
							</button>
							<button
								type='reset'
								id='signupFormReset'
								onClick={this.resetState}>
								Reset
							</button>
						</form>
					</div>
				)}
			</PhotoGramContext.Consumer>
		);
	}
}

export default SignUp;
