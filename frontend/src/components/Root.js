import React from "react";
import { Link, Route, Switch } from "react-router-dom";

// components

import Customer from './Customer';
import Home from './Home';
import Staff from './RestaurantStaff';
import Manager from './FDSmanager.js';
import Rider from './RiderSummary.js';



const Root = () => {
	return (
		<div>
			<div>
				<Link to="/">Home</Link>{" "}
				<Link to="/customer">Customer</Link>{" "}
				<Link to="/staff">Staff</Link>{" "}
				<Link to="/manager">Manager</Link>{" "}
				<Link to="/rider">Rider</Link>{" "}
			</div>
			<Switch>
				<Route component={Rider} path="/rider" />
				<Route component={Manager} path="/manager" />
				<Route component={Staff} path="/staff" />
				<Route component={Customer} path="/customer" />
				<Route component={Home} path="/" />
			</Switch>
		</div>
	);
};

export default Root;