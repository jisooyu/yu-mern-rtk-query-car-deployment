import { Routes, Route } from 'react-router-dom';
import { useFetchUserQuery } from './store';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CarForm from './pages/CarForm';
import CarEditForm from './pages/CarEditForm';
import Skeleton from './components/Skeleton';

function App() {
	const { data: user, error, isLoading } = useFetchUserQuery();

	let content;
	if (isLoading) {
		content = (
			<Skeleton
				times={20}
				className='h-10 w-full'
			/>
		);
	} else if (error) {
		content = <div>Error handling user</div>;
	} else {
		content = (
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/dashboard'
					element={
						user ? (
							<Dashboard />
						) : (
							<div>Please log in to access the dashboard.</div>
						)
					}
				/>
				<Route
					path='/form'
					element={<CarForm />}
				/>
				<Route
					path='/edit/:id'
					element={<CarEditForm />}
				/>
			</Routes>
		);
	}

	return <>{content}</>;
}

export default App;
