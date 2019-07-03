import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
import './signUp.css';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			full_name: '',
			email: '',
			password: '',
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
	//set state on change for password
	handlePasswordChange = e => {
		this.setState({
			password: e.target.value
		});
	};
	//handle form submit
	handleSubmit = (e, cd) => {
		e.preventDefault();
		cd(this.state);
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
						<p>
							This is a dummy form. Entires are required but nothing will be
							saved. Strickly for UI/UX and user flow feedback.
						</p>
						<form
							onSubmit={e => this.handleSubmit(e, context.signUp)}
							className='signupForm'>
							<label htmlFor='full-name'>
								Full Name
								<input
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
									className='signupFormInput'
									name='email'
									id='reg-email'
									onChange={this.handleEmailChange}
									required
								/>
							</label>
							<label htmlFor='password'>
								Password
								<input
									className='signupFormInput'
									name='password'
									id='reg-password'
									onChange={this.handlePasswordChange}
									required
								/>
							</label>
							<button type='submit' id='signupFormBtn'>
								Let's Go!
							</button>
						</form>
					</div>
				)}
			</PhotoGramContext.Consumer>
		);
	}
}

export default SignUp;
