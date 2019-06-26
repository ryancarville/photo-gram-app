import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import STORE from './STORE/store';

ReactDOM.render(
	<BrowserRouter>
		<App STORE={STORE} />
	</BrowserRouter>,
	document.getElementById('root')
);
