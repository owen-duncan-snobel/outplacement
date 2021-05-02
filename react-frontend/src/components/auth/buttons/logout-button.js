// src/components/logout-button.js

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
	const { logout } = useAuth0();
	return (
		<button
			onClick={() =>
				logout({
					returnTo: window.location.origin,
				})
			}
		>
<div className="my-1 text-sm font-medium text-red-600 dark:text-red-200 hover:text-red-500 dark:hover:text-red-400 md:mx-4 md:my-0">

			Log Out
			</div>
		</button>
	);
};

export default LogoutButton;
