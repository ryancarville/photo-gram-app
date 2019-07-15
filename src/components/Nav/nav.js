import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';

import './nav.css';

class Nav extends Component {
	static contextType = PhotoGramContext;

	//handle logout
	handleLogout = e => {
		this.context.state.validLogin = false;
		this.context.state.signUp = false;
	};
	render() {
		const state = this.context.state.validLogin;
		const userId = this.context.state.userId;
		const publicNav = (
			<div className='navBar'>
				<ul>
					<li>
						<Link to='/signUp'>SignUp</Link>
					</li>
					<li>
						<Link to='/'>PhotoGram</Link>
					</li>
					<li>
						<Link to='/login'>Login</Link>
					</li>
				</ul>
			</div>
		);
		const privateNav = (
			<div className='navBar'>
				<ul>
					<li>
						<Link to={`/${userId}/upload`}>Upload</Link>
					</li>
					<li>
						<Link to={`/${userId}/homePage`}>PhotoGram</Link>
					</li>
					<li>
						<Link to='/logout'>
							<span onClick={this.handleLogout}>Logout</span>
						</Link>
					</li>
				</ul>
			</div>
		);
		const currentNav = state === true ? privateNav : publicNav;
		return (
			<PhotoGramContext.Consumer>
				{context => <nav> {currentNav} </nav>}
			</PhotoGramContext.Consumer>
		);
	}
}
export default Nav;
