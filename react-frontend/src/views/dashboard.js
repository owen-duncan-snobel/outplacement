import React from 'react';
import JobCard from '../components/job-cards/job-cards';
import JobSheet from '../components/job-datasheet/job-datasheet';
const Dashboard = () => {
	return (
		<div className="grid grid-cols-3 gap-2 m-2 h-5/6">
			<div className=" pb-20 overflow-auto">
				<JobCard />
			</div>
			<div className="col-span-2 h-1/2">
				<JobSheet className="" />
			</div>
		</div>
	);
};
export default Dashboard;
