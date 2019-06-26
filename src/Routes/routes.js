import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from '../components/LandingPage/landingPage.js';
import SignUp from '../components/SignUp/signUp.js';
import Login from '../components/Login/login.js';

class Router extends Component {
	render() {
		return (
			<Switch>
				<Route path='/signUp' component={SignUp} />
				<Route path='/login' component={Login} />
				<Route exact path='/' component={LandingPage} />
				<Redirect from='*' to='/' />
			</Switch>
		);
	}
}

export default Router;
