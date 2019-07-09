import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from '../components/LandingPage/landingPage.js';
import SignUp from '../components/SignUp/signUp.js';
import Login from '../components/Login/login.js';
import HomePage from '../components/HomePage/homePage.js';
import AlbumPage from '../components/AlbumPage/albumPage.js';
import AddAlbum from '../components/AddAlbum/addAlbum';
import ImagePage from '../components/ImagePage/imagePage.js';
import UploadProfileImage from '../components/UploadProfileImage/uploadProfileImage.js';
import Upload from '../components/Upload/upload';
import EditPage from '../components/EditPage/editPage';

class Router extends Component {
	render() {
		return (
			<Switch>
				<Route exact path='/' component={LandingPage} />
				<Route path='/signUp' component={SignUp} />
				<Route path='/login' component={Login} />
				<Route path='/:user_id/homePage' component={HomePage} />
				<Route path='/:user_id/albums/addAlbum' exact component={AddAlbum} />
				<Route path='/:user_id/albums/:album_id' exact component={AlbumPage} />
				<Route path='/:user_id/images/:image_id' component={ImagePage} />
				<Route
					path='/:user_id/upload/profileImage'
					component={UploadProfileImage}
				/>
				<Route path='/:user_id/upload' component={Upload} />
				<Route path='/:user_id/edit/:image_id' component={EditPage} />
				<Redirect from='*' to='/' />
			</Switch>
		);
	}
}

export default Router;
