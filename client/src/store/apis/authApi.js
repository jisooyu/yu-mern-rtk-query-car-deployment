import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000',
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
