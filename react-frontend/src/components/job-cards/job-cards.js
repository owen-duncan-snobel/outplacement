import React, { useState } from 'react';
import Cards from './cards';
import { useAuth0 } from '@auth0/auth0-react';

const JobCards = () => {
	const { getAccessTokenSilently } = useAuth0();

	const [jobs, setJobs] = useState([
		{
			companies: 'Outplacement',
			date_listed: 'Today',
			description: [
				'RU Hacks is a student-run organization of Ryerson University, located in the heart of downtown Toronto ',
			],
			links: 'https://ruhacks.com/',
			location_job: 'Toronto',
			titles: 'RU Hacks Judge',
		},
	]);

	const submitButton = (event) => {
		event.preventDefault();
		const formdata = new FormData(event.target);
		var data = new URLSearchParams();
		data.append('q', formdata.get('job'));
		data.append('l', formdata.get('where'));

		const loadJobs = async () => {
			try {
				const token = await getAccessTokenSilently();
				const response = await fetch('http://localhost:5000/jobs', {
					method: 'POST',
					headers: {
						authorization: `Bearer ${token}`,
						Accept: 'application/json',
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: data,
				})
					.then((response) => response.json())
					.then((json) => setJobs(json));
			} catch (error) {
				console.log(error);
			}
		};
		loadJobs();
	};
	return (
		<div>
			<div>
				<div className="w-full sm:w-2/3 justify-center items-center mx-auto my-4">
					<form
						className="justify-center mx-auto my-4"
						onSubmit={(e) => submitButton(e)}
					>
						<label className="block text-sm font-medium text-gray-700"></label>
						Job
						<input
							type="text"
							name="job"
							id="job"
							className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm rounded-md border border-black"
							placeholder="Job Title, keywords, or company"
						></input>
						<label className="block text-sm font-medium text-gray-700"></label>
						Where
						<input
							type="text"
							name="where"
							id="where"
							className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm rounded-md border border-black"
							placeholder="Toronto"
						></input>
						<button
							className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold mt-1 px-3 rounded"
							type="submit"
						>
							Submit
						</button>
					</form>
				</div>
			</div>

			{jobs.length &&
				jobs.map((job, key) => <Cards key={key} data={job} />)}
		</div>
	);
};
export default JobCards;
