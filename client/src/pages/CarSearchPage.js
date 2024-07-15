import React from 'react';
import CarDetails from './CarDetails';
import { useSelector } from 'react-redux';
import { selectFilteredCars } from '../slices/carSlice'; // Import the memoized selector

function CarSearchPage({ searchTerm }) {
	/* fetch and filter the car data based on the searchTerm, 
	taking full advantage of the performance benefits provided by memoization. */
	const filteredCars = useSelector((state) =>
		selectFilteredCars(state, searchTerm)
	);

	if (!Array.isArray(filteredCars)) {
		return <div>Error: Cars data is not an array.</div>;
	}

	return (
		<>
			<CarDetails cars={filteredCars} />
		</>
	);
}

export default CarSearchPage;
