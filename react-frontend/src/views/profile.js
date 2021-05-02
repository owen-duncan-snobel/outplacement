import React from 'react';

import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/loading';
const Profile = () => {
	const {
		user,
		isAuthenticated,
		getAccessTokenSilently,
		withAuthenticationRequired,
	} = useAuth0();
	const { name, picture, email } = user;

	const callApi = () => {
		try {
			fetch('http://localhost:5000', {
				method: 'GET',
			}).then((response) => console.log(response.data));
		} catch (error) {
			console.log(error);
		}
	};

	const callProtectedApi = async () => {
		try {
			const token = await getAccessTokenSilently();
			const response = await fetch('http://localhost:5000/dashboard', {
				method: 'GET',
				headers: { authorization: `Bearer ${token}` },
			})
				.then((response) => response.json())
				.then((json) => console.log(json));
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<div className="row align-items-center profile-header">
				<div className="flex justify-center items-center my-4">
					<div className="w-full sm:w-2/3 flex flex-col bg-white rounded-lg overflow-hidden">
						<div className="col-md-2 mb-3"></div>
						<div className="flex rounded-t-lg bg-gray-200 text-2xl px-8 py-6 ">
							<img
								src={user.picture}
								alt="Profile"
								className="rounded-full item-center hover:border float-left img-fluid profile-picture mb-3 mb-md-0"
							/>
							<div className="grid grid-cols-1 text-2xl px-16 py-4 divide-y divide-gray-800">
								<div className="font-bold py-2">
									{user.nickname}
								</div>
								<div>EMAIL: {user.email}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withAuthenticationRequired(Profile, {
	onRedirecting: () => <Loading />,
});
