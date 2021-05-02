import { useAuth0 } from '@auth0/auth0-react';

const Cards = (props) => {
	const {
		companies,
		date_listed,
		description,
		links,
		location_job,
		titles,
	} = props.data;

	const { getAccessTokenSilently } = useAuth0();

	const addToGrid = async () => {
		try {
			const token = await getAccessTokenSilently();
			const response = await fetch('http://localhost:5000/dashboard', {
				method: 'GET',
				headers: {
					authorization: `Bearer ${token}`,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}).then((response) => response.json());

			const grid = response.user_data;

			const updateGrid = [
				...grid,
				[
					{ readOnly: true, value: grid.length },
					{ value: companies },
					{ value: titles.replaceAll(/new/g, '') },
					{ value: location_job },
					{ value: description.join(' ') },
					{ value: '' },
					{ value: '' },
					{ value: '' },
				],
			];

			saveGrid(updateGrid);
		} catch (error) {
			console.log(error);
		}
	};

	const refreshPage = () => {
		window.location.reload();
	};

	const saveGrid = async (grid) => {
		try {
			const token = await getAccessTokenSilently();
			const response = await fetch('http://localhost:5000/dashboard', {
				method: 'POST',
				headers: {
					authorization: `Bearer ${token}`,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user_data: grid }),
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="flex justify-center items-center my-4">
			<div className="w-full sm:w-2/3 flex flex-col bg-white shadow-xl rounded-lg overflow-hidden">
				<div className="bg-gray-200 text-2xl font-bold">
					<button
						onClick={() => addToGrid()}
						className="text-sm bg-green-500  hover:bg-green-600 text-gray-800 font-bold py-2 px-4 rounded-r float-right"
					>
						Add to chart
					</button>
				</div>
				<div className="bg-gray-200 text-2xl px-6 py-4 font-bold">
					{titles.replaceAll(/new/g, '')}
				</div>
				<div className="flex items-center pt-3">
					<div className="ml-4">
						<p className=" font-medium">{companies}</p>
						<p className="text-sm text-gray-700 mt-1">
							Country: Canada
						</p>
						<p className="text-sm text-gray-700 mt-1">
							Location: {location_job}
						</p>
						<p className="text-sm text-gray-700 mt-1"></p>
					</div>
				</div>

				<div className="flex justify-between items-center px-6 py-4">
					{/* Stats buttons */}

					<div className="text-sm"></div>
				</div>

				<div className="bg-gray-200 text-blue-500 text-md font-bold px-8 py-4">
					Job Overview
				</div>
				<div className="px-6 py-4 border-t border-gray-200">
					<div className="border rounded-lg p-4 bg-gray-200 text-xs">
						{description.join(' ')}
					</div>
					<div className=" px-6 py-4 text-xs">
						<a
							href={'https://' + links}
							target="_blank"
							rel="noreferrer"
						>
							View job listing
						</a>
					</div>
				</div>

				<div className="bg-gray-200 p-2 text-gray-700 font-bold text-lg">
					Job Tags:
					<div className="flex flex-wrap justify-between items-center px-6 py-4">
						<div className="bg-pink-600 text-xs uppercase px-2 py-1 rounded-full border border-gray-200 text-gray-200 font-bold">
							Full Time
						</div>
						<div className="bg-purple-600 text-xs uppercase px-2 py-1 rounded-full border border-gray-200 text-gray-200 font-bold hover:text-grey duration-300">
							Part Time
						</div>
						<div className="bg-green-600 text-xs uppercase px-2 py-1 rounded-full border border-gray-200 text-gray-200 font-bold hover:text-grey duration-300">
							Internships
						</div>
					</div>
				</div>

				<div className="bg-gray-200 px-6 py-1"></div>
			</div>
		</div>
	);
};
export default Cards;
