import React from 'react';
import GoogleLoginButton from '../components/Auth/GoogleLoginButton';

const Home = () => {
	return (
		<>
			<div className='h-20 w-auto flex flex-row justify-between items-center bg-blue-400'>
				<h1 className='m-5 text-yellow-200'>Welcome to Car Safety Data App</h1>
				<GoogleLoginButton />
			</div>
		</>
	);
};

export default Home;
