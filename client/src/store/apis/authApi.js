import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		// baseUrl: 'http://localhost:3000',
		baseUrl: baseUrl,
	}),
	endpoints(builder) {
		return {
			fetchUser: builder.query({
				query: () => {
					return {
						url: '/api/current_user',
						method: 'GET',
					};
				},
			}),
		};
	},
});

export const { useFetchUserQuery } = authApi;

export { authApi };
