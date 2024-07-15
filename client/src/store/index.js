import { configureStore } from '@reduxjs/toolkit';
import { carApi } from './apis/carApi';
import { authApi } from './apis/authApi';

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[carApi.reducerPath]: carApi.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(carApi.middleware, authApi.middleware);
	},
});

export { useFetchUserQuery } from './apis/authApi';

// hooks must be imported from carSlice
export {
	useFetchCarQuery,
	useAddCarMutation,
	useRemoveCarMutation,
	useEditCarMutation,
	useFetchCarByIdQuery,
} from '../slices/carSlice';
