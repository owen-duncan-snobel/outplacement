import React, { useEffect, useState } from 'react';
import JobCard from '../components/job-cards/job-cards';
import JobSheet from '../components/job-datasheet/job-datasheet';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/loading';
import { Bar } from 'react-chartjs-2';

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
					'https://arcane-fortress-87849.herokuapp.com/dashboard',
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

	const chartdata = {
		labels: ['Applied', 'Ghosted', 'Interviewed', 'Accepted', 'Rejected'],
		datasets: [
			{
				label: 'Job Applications',
				data: [20, 11, 7, 1, 1],
				fill: false,
				backgroundColor: 'rgb(131, 174, 235)',
				borderColor: 'rgba(255, 99, 132, 0.2)',
			},
		],
	};

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
		maintainAspectRatio: false,
	};

	return (
		<div className="grid grid-cols-1 gap-2 m-2 lg:grid-cols-3 h-5/6 overflow-auto">
			<div className=" m-1 col-span-1 md:col-span-1 overflow-auto">
				<div className="pb-20 overflow-auto">
					<JobCard data={jobData} />
				</div>
			</div>
			<div className=" m-1 md:col-span-2">
				<div className="">
					<JobSheet data={jobData} />
				</div>
				<div className="mt-2 h-1/3">
					<Bar
						data={chartdata}
						options={options}
						width={100}
						height={50}
					/>
				</div>
			</div>
		</div>
	);
};

export default withAuthenticationRequired(Dashboard, {
	onRedirecting: () => <Loading />,
});
