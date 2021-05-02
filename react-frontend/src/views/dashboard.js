import React, { useEffect, useState } from 'react';
import JobCard from '../components/job-cards/job-cards';
import JobSheet from '../components/job-datasheet/job-datasheet';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/loading';

const Dashboard = () => {
	const [jobData, setJobData] = useState({
		user_data: [
			[
				{ readOnly: true, value: '' },
				{ value: 'Company', readOnly: true },
				{ value: 'Job Name', readOnly: true },
				{ value: 'Location', readOnly: true },
				{ value: 'Job Description', readOnly: true },
				{ value: 'Date Applied', readOnly: true },
				{ value: 'Status', readOnly: true },
				{ value: 'Date Updated', readOnly: true },
			],
			[
				{ readOnly: true, value: 1 },
				{ value: '' },
				{ value: '' },
				{ value: '' },
				{ value: '' },
				{ value: '' },
				{ value: '' },
				{ value: '' },
			],
		],
	});
	const [savedJobs, setSavedJobs] = useState([]);

	const { getAccessTokenSilently, isAuthenticated } = useAuth0();

	useEffect(() => {
		async function fetchData() {
			try {
				if (isAuthenticated) {
					const token = await getAccessTokenSilently();
					console.log(token);
					const response = await fetch(
						'http://localhost:5000/dashboard',
						{
							method: 'GET',
							headers: { authorization: `Bearer ${token}` },
						}
					)
						.then((response) => console.log(response))
						.then((json) => console.log(json));
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, [getAccessTokenSilently, isAuthenticated]);

	return (
		<div className="grid grid-cols-3 gap-2 m-2 h-5/6">
			<div className=" pb-20 overflow-auto">
				<JobCard />
			</div>
			<div className="col-span-2 h-1/2">
				<JobSheet data={jobData} />
			</div>
		</div>
	);
};

export default withAuthenticationRequired(Dashboard, {
	onRedirecting: () => <Loading />,
});
