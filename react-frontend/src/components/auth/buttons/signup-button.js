import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignupButton = () => {
	const { loginWithRedirect } = useAuth0();
	return (
		<button
			class="bg-indigo-500 hover:bg-indigo-700 text-white m-2 font-semibold px-3 rounded"
			onClick={() =>
				loginWithRedirect({
					screen_hint: 'signup',
				})
			}
		>
			Click to start your journey
		</button>
	);
};

export default SignupButton;
