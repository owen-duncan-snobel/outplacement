import React, { useEffect, useState } from 'react';
import JobCard from '../components/job-cards/job-cards';
import JobSheet from '../components/job-datasheet/job-datasheet';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/loading';

const Dashboard = () => {
	const { getAccessTokenSilently, isAuthenticated } = useAuth0();

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

	useEffect(() => {
		(async () => {
			try {
				const token = await getAccessTokenSilently();

				const response = await fetch(
					'http://localhost:5000/dashboard',
					{
						method: 'GET',
						headers: { authorization: `Bearer ${token}` },
					}
				);
				const data = await response.json();
				setJobData(data);
			} catch (e) {
				console.error(e);
			}
		})();
	}, [getAccessTokenSilently]);

	return (
		<div className="grid grid-cols-3 gap-2 m-2 h-5/6">
			<div className=" pb-20 overflow-auto">
				<JobCard data={jobData} />
			</div>
			<div>
				<div className="col-span-2 h-1/2">
					<JobSheet data={jobData} />
				</div>
				<div className="col-span-2 h-1/2">Working</div>
			</div>
		</div>
	);
};

export default withAuthenticationRequired(Dashboard, {
	onRedirecting: () => <Loading />,
});
