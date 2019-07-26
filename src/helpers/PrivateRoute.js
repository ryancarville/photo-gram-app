import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../services/token-service';

export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			TokenService.getAuthToken() ? (
				<Component {...props} />
			) : (
				<Redirect to={'/login'} />
			)
		}
	/>
);
