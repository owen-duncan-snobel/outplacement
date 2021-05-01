import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import JobSheet from '../components/job-datasheet/job-datasheet';
const Profile = () => {
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
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
			const response = await fetch('http://localhost:5000/protected', {
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
				<div className="col-md-2 mb-3">
					<img
						src={picture}
						alt="Profile"
						className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
					/>
				</div>
				<div className="col-md text-center text-md-left">
					<h2>{name}</h2>
					<p className="lead text-muted">{email}</p>
				</div>
			</div>
			<div className="row">
				<pre className="col-12 text-light bg-dark p-4">
					{JSON.stringify(user, null, 2)}
				</pre>
			</div>
			<button onClick={callApi}>CALL API</button>
			<button onClick={callProtectedApi}>CALL PROTECT API</button>
		</div>
	);
};

export default Profile;
