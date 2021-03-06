import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ReactDOM from 'react-dom';
import App from './App.js';
import LandingPage from './components/LandingPage/landingPage';
import SignUp from './components/SignUp/signUp';
import LogIn from './components/Login/login';
import HomePage from './components/HomePage/homePage';
import ImagePage from './components/ImagePage/imagePage';

describe('All views', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<App />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('renders landing page', () => {
		const image = document.createElement('img');
		ReactDOM.render(<LandingPage />, image);
		ReactDOM.unmountComponentAtNode(image);
	});

	it('renders singup page', () => {
		const signUpForm = document.createElement('div');
		ReactDOM.render(<SignUp />, signUpForm);
		ReactDOM.unmountComponentAtNode(signUpForm);
	});

	it('renders logIn page', () => {
		const logInForm = document.createElement('div');
		ReactDOM.render(<LogIn />, logInForm);
		ReactDOM.unmountComponentAtNode(logInForm);
	});

	it('renders homePage', () => {
		const div = document.createElement('div');
		const match = { params: { user_id: '1' } };
		const compoonent = (
			<App>
				{' '}
				<HomePage match={match} />
			</App>
		);
		ReactDOM.render(compoonent, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('renders imagePage', () => {
		const div = document.createElement('div');
		const match = { params: { user_id: '1' } };
		const compoonent = (
			<App>
				{' '}
				<ImagePage match={match} />
			</App>
		);
		ReactDOM.render(compoonent, div);
		ReactDOM.unmountComponentAtNode(div);
	});
});
