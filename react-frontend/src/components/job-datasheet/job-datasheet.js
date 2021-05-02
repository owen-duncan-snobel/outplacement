import React, { useEffect, useState } from 'react';
import ReactDataSheet from 'react-datasheet';
import _ from 'lodash';
import { useAuth0 } from '@auth0/auth0-react';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';

const JobSheet = (props) => {
	const user_data = props.data.user_data;
	const [usersData, setUsersData] = useState(user_data);
	const [grid, setGrid] = useState(user_data);
	const { getAccessTokenSilently } = useAuth0();

	useEffect(() => {
		loadGrid();
	}, []);

	const valueRenderer = (cell) => cell.value;
	const onCellsChanged = (changes) => {
		changes.forEach(({ cell, row, col, value }) => {
			grid[row][col] = { ...grid[row][col], value };
		});
	};

	const onContextMenu = (e, cell, i, j) =>
		cell.readOnly ? e.preventDefault() : null;

	const addGrid = () => {
		setGrid([
			...grid,
			[
				{ readOnly: true, value: grid.length },
				{ value: '' },
				{ value: '' },
				{ value: '' },
				{ value: '' },
				{ value: '' },
				{ value: '' },
				{ value: '' },
			],
		]);
	};

	const deleteLastGrid = () => {
		const newGrid = [...grid];
		if (newGrid.length > 2) newGrid.pop();
		setGrid(newGrid);
	};

	const saveGrid = async () => {
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

	const loadGrid = async () => {
		try {
			const token = await getAccessTokenSilently();
			const response = await fetch('http://localhost:5000/dashboard', {
				method: 'GET',
				headers: {
					authorization: `Bearer ${token}`,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			})
				.then((response) => response.json())
				.then((json) => setGrid(json.user_data));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div className=" max-h-80 overflow-auto">
				<ReactDataSheet
					className="container text-xs mx-auto"
					data={grid}
					overflow="wrap"
					valueRenderer={valueRenderer}
					onContextMenu={onContextMenu}
					onCellsChanged={onCellsChanged}
				/>
			</div>
			<button onClick={() => addGrid()}>
				{' '}
				<div className="my-2 text-sm font-bold text-blue-600 dark:text-blue-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-2 md:my-0">
					New Row
				</div>
			</button>
			<button onClick={() => deleteLastGrid()}>
				<div className="my-2 text-sm font-bold text-red-600 dark:text-red-200 hover:text-red-500 dark:hover:text-red-400  md:mx-2 md:my-0">
					Delete Row
				</div>
			</button>
			<button onClick={() => loadGrid()}>
				<div className="my-2 text-sm font-bold text-green-700 dark:text-red-200 hover:text-red-500 dark:hover:text-red-400  md:mx-2 md:my-0">
					Load
				</div>
			</button>
			<button onClick={() => saveGrid()}>
				<div className="my-2 text-sm font-bold text-purple-800 dark:text-red-200 hover:text-red-500 dark:hover:text-red-400  md:mx-2 md:my-0">
					Save
				</div>
			</button>
		</div>
	);
};
export default JobSheet;
