import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';
import './styles/tailwind.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth0ProviderWithHistory from './components/auth/auth0-provider-with-history';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Auth0ProviderWithHistory>
				<App />
			</Auth0ProviderWithHistory>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);
