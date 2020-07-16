import React, { Component, Fragment } from "react";
// import logo from "./logo.svg";
import "./App.css";

import Home from "./pages/Home";
import Success from "./pages/Success";
import ClientForm from "./pages/ClientForm";

import { Route, Link, Switch } from "react-router-dom";

import Header from "./components/Header";

class App extends Component {
	render() {
		return (
			<Fragment>
				<Header />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/client-form" component={ClientForm} />
					<Route component={Error} />
				</Switch>
			</Fragment>
		);
	}
}

export default App;
