import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthenticationButton from './auth/buttons/authenticated-button';

const Navbar = () => {
	return (
		<nav className="inline-flex w-full p-3">
			<div className="pl-3">LOGO</div>

			<div className="flex w-full justify-end space-x-4">
				<NavLink to="/dashboard">Dashboard</NavLink>
				<NavLink to="/profile">Profile</NavLink>
				<AuthenticationButton />
			</div>
		</nav>
	);
};
export default Navbar;
