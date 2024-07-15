import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { store } from './store';
import { Provider } from 'react-redux';
import { extendedApiSlice } from './slices/carSlice';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

store.dispatch(extendedApiSlice.endpoints.fetchCar.initiate());

root.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
);
