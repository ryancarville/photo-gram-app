import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from '../components/LandingPage/landingPage.js';
import SignUp from '../components/SignUp/signUp.js';
import Login from '../components/Login/login.js';
import HomePage from '../components/HomePage/homePage.js';
import AlbumPage from '../components/AlbumPage/albumPage.js';
import ImagePage from '../components/ImagePage/imagePage.js';
import Upload from '../components/Upload/upload';

class Router extends Component {
	render() {
		return (
			<Switch>
				<Route exact path='/' component={LandingPage} />
				<Route path='/signUp' component={SignUp} />
				<Route path='/login' component={Login} />
				<Route path='/homePage' component={HomePage} />
				<Route path='/albums/:album_id' component={AlbumPage} />
				<Route path={'/images/:image_id'} component={ImagePage} />
				<Route path='/upload' component={Upload} />
				<Redirect from='*' to='/' />
			</Switch>
		);
	}
}

export default Router;
