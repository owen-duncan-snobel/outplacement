import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();

	return ( 
		

			 <button onClick={() => loginWithRedirect()}> <div className="my-1 text-sm font-medium text-green-600 float-right dark:text-green-200 hover:text-green-500 dark:hover:text-green-400 md:mx-4 md:my-0">Log In </div></button> 
	)
};

export default LoginButton;
