import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";

import Root from './components/Root';

//ReactDOM.render(<RestaurantSwitcher/>,document.getElementById('restaurant'));
ReactDOM.render(
	<BrowserRouter>
	<Root />
	</BrowserRouter>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
