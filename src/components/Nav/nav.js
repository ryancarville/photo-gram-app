import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import './nav.css';

class Nav extends Component {
	componentWillMount() {
		// will trigger the callback function whenever a new Route renders a component(as long as this component stays mounted as routes change)
		this.props.history.listen(() => {
			// view new URL
			console.log('New URL', this.props.history.location.pathname);
		});
	}
	render() {
		return (
			<nav>
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
			</nav>
		);
	}
}
export default withRouter(Nav);
