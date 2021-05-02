import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './components/navbar';
import Profile from './views/profile';
import Dashboard from './views/dashboard';
import Loading from './components/loading';
import Home from './views/home';

const App = () => {
	const { isLoading } = useAuth0();

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className="h-screen">
			<Navbar />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/profile" component={Profile} />
			</Switch>
		</div>
	);
};

export default App;
