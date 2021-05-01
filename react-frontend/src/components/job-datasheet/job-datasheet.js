import React, { useEffect, useState } from 'react';
import ReactDataSheet from 'react-datasheet';
import _ from 'lodash';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';

const JobSheet = () => {
	const [usersData, setUsersData] = useState([]);

	const [grid, setGrid] = useState([
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
	]);

	useEffect(() => {}, []);

	const valueRenderer = (cell) => cell.value;

	const onCellsChanged = (changes) => {
		changes.forEach(({ cell, row, col, value }) => {
			grid[row][col] = { ...grid[row][col], value };
		});

		/**
		 * * THIS IS WHERE THE POSTING TO SAVE THE CELL FOR THE USERS PROFILE WILL GO
		 */
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
		if (newGrid.length != 1) newGrid.pop();
		setGrid(newGrid);
	};

	return (
		<>
			<ReactDataSheet
				className="container text-xs mx-auto"
				data={grid}
				overflow="wrap"
				valueRenderer={valueRenderer}
				onContextMenu={onContextMenu}
				onCellsChanged={onCellsChanged}
			/>
			<button onClick={() => addGrid()}>new job</button>
			<button onClick={() => deleteLastGrid()}>delete last row</button>
		</>
	);
};
export default JobSheet;
