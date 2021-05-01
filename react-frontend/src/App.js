import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ProtectedRoute from './components/auth/protected-route';
import Navbar from './components/navbar';
import Profile from './views/profile';
import Dashboard from './views/dashboard';
const App = () => {
	return (
		<div className="h-screen">
			<Navbar />
			<Switch>
				<Link path="/dashboard" component={Dashboard} />
				<ProtectedRoute path="/profile" component={Profile} />
			</Switch>
		</div>
	);
};

export default App;
