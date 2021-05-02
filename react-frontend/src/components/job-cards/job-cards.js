import React, { useEffect } from 'react';
import Cards from './cards';
const JobCards = () => {
	const submitButton = (event) => {
		event.preventDefault();
	};
	return (
		<div>
			<div>
				<form>
					<label className="block text-sm font-medium text-gray-700"></label>
					Job
					<input
						type="text"
						name="price"
						id="price"
						className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm rounded-md border border-black"
						placeholder="Job Title, keywords, or company"
					></input>
					<label className="block text-sm font-medium text-gray-700"></label>
					Where
					<input
						type="text"
						name="price"
						id="price"
						className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm rounded-md border border-black"
						placeholder="Toronto"
					></input>
					<input
						type="submit"
						value="Submit"
						onClick={(e) => submitButton(e)}
					></input>
				</form>
			</div>

			<Cards />
		</div>
	);
};
export default JobCards;
