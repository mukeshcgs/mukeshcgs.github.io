import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import App from "./components/App"
import store from "./store/Store"
import '../css/main.scss';

const app = document.getElementById('app')
if (process.env.NODE_ENV !== 'production') {
	console.log('Looks like we are in development mode!');
}

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
	, app);

