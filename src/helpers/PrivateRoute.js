import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			sessionStorage.getItem('photoGram-client-auth-token') ? (
				<Component {...props} />
			) : (
				<Redirect to={'/login'} />
			)
		}
	/>
);
