import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from '../components/LandingPage/landingPage.js';
import Loading from '../components/Loading/loading';
import SignUp from '../components/SignUp/signUp.js';
import Login from '../components/Login/login.js';
import HomePage from '../components/HomePage/homePage.js';
import AlbumPage from '../components/AlbumPage/albumPage.js';
import AddAlbum from '../components/AddAlbum/addAlbum';
import ImagePage from '../components/ImagePage/imagePage.js';
import UploadProfileImage from '../components/UploadProfileImage/uploadProfileImage.js';
import Upload from '../components/Upload/upload';
import EditPage from '../components/EditPage/editPage';
import PhotoGramContext from '../PhotoGramContext';

class Router extends Component {
	static contextType = PhotoGramContext;
	render() {
		return (
			<Switch>
				<Route path='/' exact component={LandingPage} />
				<Route path='/signUp' exact component={SignUp} />
				<Route path='/login' exact component={Login} />
				{this.context.state.isData === false ? (
					<Loading />
				) : (
					<Route path='/user/:user_id' exact component={HomePage} />
				)}
				<Route path='/user/:user_id/addAlbum' exact component={AddAlbum} />
				<Route
					path='/user/:user_id/albums/:album_id'
					exact
					component={AlbumPage}
				/>
				<Route
					path='/user/:user_id/images/:image_id'
					exact
					component={ImagePage}
				/>
				<Route
					path='/user/:user_id/upload/profileImage'
					exact
					component={UploadProfileImage}
				/>
				<Route path='/user/:user_id/upload' exact component={Upload} />
				<Route
					path='/user/:user_id/edit/:image_id'
					exact
					component={EditPage}
				/>
				<Redirect from='*' to='/' />
			</Switch>
		);
	}
}

export default Router;
