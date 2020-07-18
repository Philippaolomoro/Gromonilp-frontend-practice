import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { CREDENTIALS, SHEET_ID } from '../constants/'
import { GoogleSpreadsheet	 } from "google-spreadsheet"; 

async function insert(newUser) {
    const document = new GoogleSpreadsheet(SHEET_ID)
    await document.useServiceAccountAuth(CREDENTIALS)
    await document.loadInfo()
    const sheet = document.sheetsByIndex[1]
    const rows  = await sheet.getRows()
    const exists = rows.map(e => e._rawData).filter(e => newUser.email === e[3] || newUser.businessName === e[2])
    if(exists.length > 0){
        throw new Error("It seems you have registered for this before, kindly re-check the email and business name if this is not so.")
	}
	const result =sheet.addRow(newUser)
    return await result._rawData
}

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
		const { surname, firstName, businessName, email, phone } = formData;
		const data = {surname, firstName, businessName, email, phone, dateRegistered: new Date()}
		await insert(data)
					.then(_ => setMessage(`Thanks for registering with us ${data.firstName}!, your template is on the way.`))
					.catch(err => setMessage(err.toString()));
		
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
					name="firstName"
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
