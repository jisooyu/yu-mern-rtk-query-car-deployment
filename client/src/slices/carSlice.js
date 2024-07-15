// Assuming you've already imported createSelector and createEntityAdapter
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { carApi } from '../store/apis/carApi';

// to create a unique id and normalize the data
const carAdapter = createEntityAdapter({
	selectId: (car) => car._id, // Use _id as the unique identifier
	sortComparer: (a, b) => a.modelName.localeCompare(b.modelName),
});

const initialState = carAdapter.getInitialState();

// create the endpoints
export const extendedApiSlice = carApi.injectEndpoints({
	endpoints: (builder) => ({
		fetchCar: builder.query({
			query: () => '/car/fetch',
			// to modify the normalized data
			transformResponse: (response) => {
				try {
					return carAdapter.setAll(initialState, response);
				} catch (error) {
					console.error('Error transforming response data:', error);
					return initialState;
				}
			},
			// to manage caching, note: the result is from transformResponse
			providesTags: (result, error, arg) => {
				try {
					const tags = [
						{ type: 'Car', id: 'LIST' },
						...(result.ids
							? result.ids.map((id) => ({
									type: 'Car',
									id: arg?.contentId ?? id,
							  }))
							: []),
					];
					return tags;
				} catch (error) {
					console.error('Error generating tags:', error);
					return [];
				}
			},
		}),
		addCar: builder.mutation({
			query: (car) => ({
				url: '/car/save',
				method: 'POST',
				body: car,
			}),
			invalidatesTags: [{ type: 'Car', id: 'LIST' }],
		}),
		removeCar: builder.mutation({
			query: (id) => ({
				url: `/car/delete/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, id) => [
				{ type: 'Car', id },
				{ type: 'Car', id: 'LIST' },
			],
		}),
		editCar: builder.mutation({
			query: ({ id, formDataObject }) => ({
				url: `/car/update/${id}`,
				method: 'PUT',
				body: formDataObject,
			}),
			invalidatesTags: [{ type: 'Car', id: 'LIST' }],
		}),
		fetchCarById: builder.query({
			query: (id) => `/car/fetchDataById/${id}`,
			transformResponse: (response) => response, // Transform if necessary
			providesTags: (result, error, id) => [{ type: 'Car', id }],
		}),
	}),
});

export const {
	useFetchCarQuery,
	useAddCarMutation,
	useRemoveCarMutation,
	useEditCarMutation,
	useFetchCarByIdQuery,
} = extendedApiSlice;

/*
selectCarResult is a selector created using the fetchCar endpoint's select method. 
This selector extracts the result of the fetchCar query from the Redux state.
*/
export const selectCarResult = extendedApiSlice.endpoints.fetchCar.select();

/*
 This selectCarData is in the normalized state format (with ids and entities).
*/
const selectCarData = createSelector(
	selectCarResult, // input function
	(carResult) => carResult?.data ?? initialState // output function: normalized state object with ids & entities
);

// New selector: Filter cars based on the search term
export const selectFilteredCars = createSelector(
	selectCarData,
	(_, searchTerm) => searchTerm, // Pass the search term as an argument
	(cars, searchTerm) => {
		// Transform normalized data to an array
		const carArray = cars.ids.map((id) => cars.entities[id]);
		// Filter the array based on the search term
		if (!searchTerm) {
			return carArray;
		}
		return carArray.filter((car) =>
			car.modelName.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}
);

export const {
	selectAll: selectAllCars,
	selectById: selectCarById,
	selectIds: selectCarIds,
	// Pass in a selector that returns the car slice of state
} = carAdapter.getSelectors((state) => selectCarData(state));
