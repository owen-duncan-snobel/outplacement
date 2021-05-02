import SignupButton from '../components/auth/buttons/signup-button';

const Home = () => {
	return (
		<>
			<div className="mx-auto text-center mt-20 text-9xl">Welcome</div>
			<div className="mx-auto text-center mt-8 text-3xl italic">
				Track your journey
			</div>

			<div className=" text-center my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 mx-auto md:mx-4 md:my-0">
				<SignupButton />
			</div>
		</>
	);
};
export default Home;
