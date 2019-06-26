import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from '../components/LandingPage/landingPage.js';
import SignUp from '../components/SignUp/signUp.js';
import Login from '../components/Login/login.js';
import HomePage from '../components/HomePage/homePage.js';
import AlbumPage from '../components/AlbumPage/albumPage.js';

class Router extends Component {
	render() {
		return (
			<Switch>
				<Route exact path='/' component={LandingPage} />
				<Route path='/signUp' component={SignUp} />
				<Route path='/login' component={Login} />
				<Route path='/homePage' component={HomePage} />
				<Route path='/user/albums/:album_id' component={AlbumPage} />
				<Redirect from='*' to='/' />
			</Switch>
		);
	}
}

export default Router;
