import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { PrivateRoute } from '../helpers/PrivateRoute';
import PhotoGramContext from '../PhotoGramContext';
import Nav from '../components/Nav/nav';
import LandingPage from '../components/LandingPage/landingPage.js';
import SignUp from '../components/SignUp/signUp.js';
import Login from '../components/Login/login.js';
import HomePage from '../components/HomePage/homePage.js';
import AlbumPage from '../components/AlbumPage/albumPage.js';
import AddAlbum from '../components/AddAlbum/addAlbum';
import ImagePage from '../components/ImagePage/imagePage.js';
import UpdateProfile from '../components/UpdateProfile/updateProfile.js';
import Upload from '../components/Upload/upload';
import EditPage from '../components/EditPage/editPage';

class Routes extends Component {
	render() {
		return (
			<>
				<Nav />
				<Switch>
					<Route path='/' exact component={LandingPage} />
					<Route path='/signUp' exact component={SignUp} />
					<Route path='/login' exact component={Login} />
					<PrivateRoute path='/user/:user_id' exact component={HomePage} />
					<PrivateRoute
						path='/user/:user_id/addAlbum'
						exact
						component={AddAlbum}
					/>
					<PrivateRoute
						path='/user/:user_id/albums/:album_id'
						exact
						component={AlbumPage}
					/>
					<PrivateRoute
						path='/user/:user_id/images/:image_id'
						exact
						component={ImagePage}
					/>
					<PrivateRoute
						path='/user/:user_id/update-profile'
						exact
						component={UpdateProfile}
					/>
					<PrivateRoute path='/user/:user_id/upload' exact component={Upload} />
					<PrivateRoute
						path='/user/:user_id/edit/:image_id'
						exact
						component={EditPage}
					/>
					<Redirect from='*' to='/' />
				</Switch>
			</>
		);
	}
}

export default withRouter(Routes);
