import React from 'react';
import Navbar from './components/navbar';
import Profile from './views/profile';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ProtectedRoute from './components/auth/protected-route';
const App = () => {
	return (
		<div>
			<Navbar />
			<Switch>
				<ProtectedRoute path="/profile" component={Profile} />
			</Switch>
		</div>
	);
};

export default App;
