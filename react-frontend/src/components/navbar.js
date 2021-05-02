import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthenticationButton from './auth/buttons/authenticated-button';

const Navbar = () => {
	return (
		

		
		<nav className="bg-white shadow dark:bg-gray-800">
			<div className="container px-6 py-3 mx-auto md:flex md:justify-between md:items-center">
			<div className="flex items-center justify-content-between">
			
			

		<div className="pl-3 text-xl font-bold text-gray-800 dark:text-white md:text-2xl hover:text-gray-700 dark:hover:text-gray-300 ">Outplacement</div>
		
			
		
                <div className="flex flex-col md:flex-row md:mx-6">
			
				<div className="inline-block">
					<div className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
						<NavLink to="/dashboard">Dashboard</NavLink>
					</div>

					<div className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
						<NavLink to="/profile">Profile</NavLink>
					</div>
				</div>

				
				<AuthenticationButton />
				
			</div>
		




			
			</div>

			</div>
		</nav>
	);
};
export default Navbar;
