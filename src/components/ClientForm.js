import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

const initialState = {
	name: "",
	email: "",
	business_name: "",
	country: "",
};

class ClientForm extends React.Component {
	state = {
		pk: 0,
		name: "",
		email: "",
		business_name: "",
		country: "",
	};

	componentDidMount() {
		if (this.props.client) {
			const {
				pk,
				name,
				email,
				phone,
				business_name,
				country,
			} = this.props.client;
			this.setState(pk, name, document, email, phone);
		}
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	createClient = (e) => {
		e.preventDefault();
		axios.post(API_URL, this.state).then(() => {
			this.props.resetState();
			this.props.toggle();
		});
	};

	editClient = (e) => {
		e.preventDefault();
		axios.put(API_URL + this.state.pk, this.state).then(() => {
			this.props.resetState();
			this.props.toggle();
		});
	};

	defaultIfEmpty = (value) => {
		return value === " " ? " " : value;
	};

	render() {
		return (
			<Form onSubmit={this.props.client ? this.editClient : this.createClient}>
				<FormGroup>
					<Label for="name">Name:</Label>
					<Input
						type="text"
						name="name"
						onChange={this.onChange}
						value={this.defaultIfEmpty(this.state.name)}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="email">Email:</Label>
					<Input
						type="email"
						name="email"
						onChange={this.onChange}
						value={this.defaultIfEmpty(this.state.email)}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="phone">Phone Number:</Label>
					<Input
						type="text"
						name="phone"
						onChange={this.onChange}
						value={this.defaultIfEmpty(this.state.phone)}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="business_name">Business Name:</Label>
					<Input
						type="text"
						name="business_name"
						onChange={this.onChange}
						value={this.defaultIfEmpty(this.state.business_name)}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="country">Country:</Label>
					<Input
						type="text"
						name="country"
						onChange={this.onChange}
						value={this.defaultIfEmpty(this.state.country)}
					/>
				</FormGroup>
				<Button>Send</Button>
			</Form>
		);
	}
}

export default ClientForm;
