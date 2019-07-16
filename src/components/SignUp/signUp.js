import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
import './signUp.css';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			full_name: '',
			email: '',
			user_name: '',
			password: '',
			reEnterPass: '',
			error: null
		};
	}
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
	};
	//ensure password match
	handlePasswordMatch = e => {
		this.setState({
			reEnterPass: e.target.value
		});
	};
	//handle form submit
	handleSubmit = (e, cd) => {
		e.preventDefault();
		if (this.state.reEnterPass !== this.state.password) {
			this.setState({
				error: 'Passwords do not match'
			});
		}
		const newUser = {
			full_name: this.state.full_name,
			email: this.state.email,
			user_name: this.state.user_name,
			password: this.state.password
		};
		cd(newUser);
	};
	render() {
		if (this.context.state.signUp) {
			return <Redirect to='/login' />;
		}
		return (
			<PhotoGramContext.Consumer>
				{context => (
					<div className='reg-form' id='newUserForm'>
						<h3>SignUp Today!</h3>
						<div>
							{this.state.error}
							{this.context.state.error}
						</div>
						<form
							onSubmit={e => this.handleSubmit(e, context.signUp)}
							className='signupForm'>
							<label htmlFor='full-name'>
								Full Name
								<input
									type='text'
									className='signupFormInput'
									name='full-name'
									id='reg-full-name'
									onChange={this.handleNameChange}
									required
								/>
							</label>
							<label htmlFor='email'>
								Email Address
								<input
									type='text'
									className='signupFormInput'
									name='email'
									id='reg-email'
									onChange={this.handleEmailChange}
									required
								/>
							</label>
							<label htmlFor='user_name'>
								User Name
								<input
									type='text'
									className='signupFormInput'
									name='user_name'
									id='reg-user-name'
									onChange={this.handleUserNameChange}
									required
								/>
							</label>
							<label htmlFor='password'>
								Password
								<input
									type='password'
									className='signupFormInput'
									name='password'
									id='reg-password'
									onChange={this.handlePasswordChange}
									required
								/>
							</label>
							<label htmlFor='password'>
								Re-Enter Password
								<input
									type='password'
									className='signupFormInput'
									name='password'
									id='reg-reEnter-password'
									onChange={this.handlePasswordMatch}
									required
								/>
							</label>
							<button type='submit' id='signupFormBtn'>
								Let's Go!
							</button>
							<button type='reset' id='signupFormBtn'>
								Reset
							</button>
						</form>
					</div>
				)}
			</PhotoGramContext.Consumer>
		);
	}
}

export default withRouter(SignUp);
