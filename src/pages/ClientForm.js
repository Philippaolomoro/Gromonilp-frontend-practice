import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function ClientForm() {
	const [formData, setFormData] = useState({});
	const [message, setMessage] = useState("");

	const handleInput = (e) => {
		const copyFormData = { ...formData };
		copyFormData[e.target.name] = e.target.value;
		setFormData(copyFormData);
	};

	const sendData = async (e) => {
		e.preventDefault();
		const { surname, firstname, businessName, email, phone } = formData;
		try {
			const response = await fetch(
				"https://v1.nocodeapi.com/gromoni/google_sheets/zepPTtvVFklAOauc?tabId=Sheet1",
				{
					method: "post",
					body: JSON.stringify([
						[surname, firstname, businessName, email, phone],
					]),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const json = await response.json();
			console.log("Success:", JSON.stringify(json));
			setMessage("Success");
		} catch (error) {
			console.error("Error:", error);
			setMessage("Error");
		}
	};

	return (
		<Form
			className="input-form"
			id="client-form"
			name="client-form"
			onSubmit={sendData}
		>
			<p>WHAT IS YOUR NAME?</p>
			<FormGroup>
				<Input
					type="text"
					name="surname"
					placeholder="Surname"
					onChange={handleInput}
					required
				/>
			</FormGroup>
			<FormGroup>
				<Input
					type="text"
					name="firstname"
					placeholder="First name"
					onChange={handleInput}
					required
				/>
			</FormGroup>
			<FormGroup>
				<Label for="businessName">WHAT IS YOUR BUSINESS NAME?</Label>
				<Input
					type="text"
					name="businessName"
					id="businessName"
					onChange={handleInput}
					required
				/>
			</FormGroup>
			<FormGroup>
				<Label for="email">YOUR EMAIL?</Label>
				<Input
					type="email"
					name="email"
					id="email"
					placeholder="example@gmail.com"
					onChange={handleInput}
					required
				/>
			</FormGroup>
			<FormGroup>
				<Label for="phone">YOUR PHONE NUMBER?</Label>
				<Input
					type="text"
					name="phone"
					id="phone"
					placeholder="0812 000 1234"
					onChange={handleInput}
					required
				/>
			</FormGroup>
			<Button className="form-button">Done</Button>
			{message}
		</Form>
	);
}
