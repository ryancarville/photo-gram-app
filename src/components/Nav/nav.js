import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PhotoGramContext from '../../PhotoGramContext';
import TokenService from '../../services/token-service';
import './nav.css';

class Nav extends Component {
	//set context for component
	static contextType = PhotoGramContext;
	render() {
		const loggedIn = TokenService.getAuthToken();
		const userId = this.context.state.user.id;
		const publicNav = (
			<div className='navBar'>
				<ul>
					<li>
						<Link to='/signUp'>SignUp</Link>
					</li>
					<li>
						<Link to='/'>
							<img
								src='https://beardystudios.com/Bloc_Capstone/photoGram/favicon/whiteNav.png'
								alt='logo'
							/>
						</Link>
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
						<Link to={`/user/${userId}/upload`}>Upload</Link>
					</li>
					<li>
						<Link to={`/user/${userId}`}>
							<img
								src='https://beardystudios.com/Bloc_Capstone/photoGram/favicon/whiteNav.png'
								alt='logo'
							/>
						</Link>
					</li>
					<li>
						<Link to={'/login'} onClick={() => this.context.logout()}>
							Logout
						</Link>
					</li>
				</ul>
			</div>
		);
		const currentNav = loggedIn ? privateNav : publicNav;
		return <nav> {currentNav} </nav>;
	}
}
export default withRouter(Nav);
