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
	handleNameChange = e => {
		this.setState({
			full_name: e.target.value
		});
	};

	handleEmailChange = e => {
		this.setState({
			email: e.target.value
		});
	};

	handlePasswordChange = e => {
		this.setState({
			password: e.target.value
		});
	};

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
