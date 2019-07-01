import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from '../components/LandingPage/landingPage.js';
import SignUp from '../components/SignUp/signUp.js';
import Login from '../components/Login/login.js';
import HomePage from '../components/HomePage/homePage.js';
import AlbumPage from '../components/AlbumPage/albumPage.js';
import AddAlbum from '../components/AddAlbum/addAlbum';
import ImagePage from '../components/ImagePage/imagePage.js';
import Upload from '../components/Upload/upload';
import EditPage from '../components/EditPage/editPage';

class Router extends Component {
	render() {
		return (
			<Switch>
				<Route exact path='/' component={LandingPage} />
				<Route path='/signUp' component={SignUp} />
				<Route path='/login' component={Login} />
				<Route path='/homePage' component={HomePage} />
				<Route path='/albums/addAlbum' exact component={AddAlbum} />
				<Route path='/albums/:album_id' exact component={AlbumPage} />
				<Route path={'/images/:image_id'} component={ImagePage} />
				<Route path='/upload' component={Upload} />
				<Route path='/edit/:image_id' component={EditPage} />
				<Redirect from='*' to='/' />
			</Switch>
		);
	}
}

export default Router;
