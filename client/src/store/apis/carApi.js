import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const carApi = createApi({
	reducerPath: 'carApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000',
	}),
	tagTypes: ['Car'],
	endpoints: (builder) => ({}),
});

export const {
	useFetchCarQuery,
	useAddCarMutation,
	useRemoveCarMutation,
	useEditCarMutation,
	useFetchCarByIdQuery,
} = carApi;

export { carApi };
