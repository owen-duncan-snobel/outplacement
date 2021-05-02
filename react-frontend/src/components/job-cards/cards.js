const Cards = () => {
	return (
		<div className="flex justify-center items-center my-4">
			<div className="w-full sm:w-2/3 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
				<div className="bg-gray-200 text-2xl px-6 py-4 font-bold"></div>
				<div className="flex items-center pt-3">
					<div className="ml-4">
						<p className="font-bold"></p>
						<p className="text-sm text-gray-700 mt-1">
							Country: Canada
						</p>
						<p className="text-sm text-gray-700 mt-1"></p>
						<p className="text-sm text-gray-700 mt-1"></p>
					</div>
				</div>

				<div className="flex justify-between items-center px-6 py-4">
					{/* Stats buttons */}

					<div className="text-sm"></div>
				</div>

				<div className="bg-gray-200 text-blue-500 text-lg font-bold px-8 py-4">
					Overview
				</div>
				<div className="px-6 py-4 border-t border-gray-200">
					<div className="border rounded-lg p-4 bg-gray-200"></div>
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
