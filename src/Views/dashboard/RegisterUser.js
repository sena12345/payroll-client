import React, { useState, useEffect } from 'react';
import 'react-bootstrap';
import { Container, Form, Row, InputGroup, FormControl, Button, Col } from 'react-bootstrap';
import Config from '../../data-operations/data-queries/config';
import { Roles, Department, Position, Designation } from '../../data-operations/_sahred/models';
import { useAuth } from '../../_services/auth-context';

function RegisterUser() {
	const { currentUser } = useAuth();

	const [ roles, setRoles ] = useState([ Roles ]);

	const queriesStore = Config(currentUser);

	async function fetchInits() {
		queriesStore
			.getRoles()
			.then((res) => {
				setRoles(res.data);
				console.log(roles);
			})
			.catch((err) => {
				console.log('cannot fetch roles due to: ' + err);
			});
	}

	useEffect(() => {
		fetchInits();
	}, []);

	return (
		<div className="registeruser">
			<Container>
				<Form className="register-form">
					<Form.Group controlId="empFullName">
						<Form.Label>Full Name</Form.Label>
						<Form.Control type="text" placeholder="Enter Employee Full Name" />
					</Form.Group>

					<Form.Group controlId="empEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control type="text" placeholder="Enter Employee Email" />
					</Form.Group>

					<Form.Group controlId="empID">
						<Form.Label>Employee ID</Form.Label>
						<Form.Control type="text" />
					</Form.Group>

					<Form.Row>
						<Form.Group as={Col} controlId="empPosition">
							<Form.Label>Position</Form.Label>
							<Form.Control type="text" />
						</Form.Group>

						<Form.Group as={Col} controlId="empDepartment">
							<Form.Label>Department</Form.Label>
							<Form.Control type="text" />
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<Form.Group as={Col} controlId="empSalary">
							<Form.Label>Salary</Form.Label>
							<Form.Control type="text" />
						</Form.Group>
						<Form.Group as={Col} controlId="empAllowance">
							<Form.Label>Allowance</Form.Label>
							<Form.Control type="text" />
						</Form.Group>
					</Form.Row>

					<Form.Group controlId="empDesignation">
						<Form.Label>Designation</Form.Label>
						<Form.Control type="text" />
					</Form.Group>

					<Form.Row>
						<Form.Group as={Col} controlId="formGridState">
							<Form.Label>Roles</Form.Label>
							<Form.Control as="select" defaultValue="Choose...">
								<option>Choose...</option>

								{roles.map((data) => {
									return <option value={data.role_id}>{data.role}</option>;
								})}
							</Form.Control>
						</Form.Group>
					</Form.Row>

					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</Container>
		</div>
	);
}

export default RegisterUser;
