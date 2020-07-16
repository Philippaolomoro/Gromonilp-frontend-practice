import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import ClientForm from "./ClientForm";

class ClientModal extends Component {
	state = {
		modal: false,
	};

	toggle = () => {
		this.setState((previous) => ({
			modal: !previous.modal,
		}));
	};

	render() {
		const create = this.props.create;

		var title = "Editing Student";
		var button = <Button onClick={this.toggle}>Edit</Button>;
		if (create) {
			title = "Sign Up";

			button = (
				<Button
					color="primary"
					className="float-right"
					onClick={this.toggle}
					style={{ minWidth: "200px" }}
				>
					Sign Up
				</Button>
			);
		}

		return (
			<Fragment>
				{button}
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>{title}</ModalHeader>

					<ModalBody>
						<ClientForm
							resetState={this.props.resetState}
							toggle={this.toggle}
							student={this.props.student}
						/>
					</ModalBody>
				</Modal>
			</Fragment>
		);
	}
}

export default ClientModal;

/*
import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { gapi } from "gapi-script";

const SPREADSHEET_ID = "1zyvWxuPb1vaJvvmGKcJWHY3mzqZRqDXQbLcwr0FGj4k";
const CLIENT_ID =
	"478677153854-boisn279f99lgobkpc0jfc0fkhq2l4q3.apps.googleusercontent.com";
const API_KEY = "AIzaSyBbFgnMQAgLj2npTrxgWQsCY4jFW2QhOrk";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

class ClientForm extends React.Component {
	constructor(props) {
		super(props);

		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	componentDidMount() {
		this.handleClientLoad();
	}

	handleClientLoad = () => {
		gapi.load("client:auth2", this.initClient);
	};

	initClient = () => {
		gapi.auth2.init({
			apiKey: API_KEY,
			clientId: CLIENT_ID,
			scope: SCOPE,
			discoveryDocs: [
				"https://sheets.googleapis.com/$discovery/rest?version=v4",
			],
		});
	};

	onFormSubmit(submissionValues) {
		const params = {
			spreadsheetId: SPREADSHEET_ID,
			range: "Sheet1",
			valueInputOption: "RAW",
			insertDataOption: "INSERT_ROWS",
		};

		const valueRangeBody = {
			majorDimension: "ROWS",
			values: [submissionValues],
		};

		let request = gapi.client.sheets.spreadsheets.values.append(
			params,
			valueRangeBody
		);
		request.then(
			function (response) {
				console.log(response.result);
			},
			function (reason) {
				console.error("error");
			}
		);
	}

	render() {
		return (
			<Form onSubmit={this.onFormSubmit}>
				<FormGroup>
					<Label for="name">Name:</Label>
					<Input type="text" name="name" />
				</FormGroup>
				<FormGroup>
					<Label for="email">Email:</Label>
					<Input type="email" name="email" />
				</FormGroup>
				<FormGroup>
					<Label for="phone">Phone Number:</Label>
					<Input type="text" name="phone" />
				</FormGroup>
				<FormGroup>
					<Label for="business_name">Business Name:</Label>
					<Input type="text" name="business_name" />
				</FormGroup>
				<FormGroup>
					<Label for="country">Country:</Label>
					<Input type="text" name="country" />
				</FormGroup>
				<Button type="submit">Send</Button>
			</Form>
		);
	}
}

export default ClientForm;
*/
