import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import LandingPage from './components/LandingPage/landingPage';
import SignUp from './components/SignUp/signUp';
import LogIn from './components/Login/login';
import HomePage from './components/HomePage/homePage';

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
		const signUpForm = document.createElement('form');
		ReactDOM.render(<SignUp />, signUpForm);
		ReactDOM.unmountComponentAtNode(signUpForm);
	});

	it('renders logIn page', () => {
		const logInForm = document.createElement('form');
		ReactDOM.render(<LogIn />, logInForm);
		ReactDOM.unmountComponentAtNode(logInForm);
	});

	it('renders home page', () => {
		const div = document.createElement('div');
		const user_id = 1;
		ReactDOM.render(<HomePage user_id={user_id} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
});
