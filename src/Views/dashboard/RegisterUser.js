import '../../assets/css/RegisterUser.css';
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Config from '../../data-operations/data-queries/config';
import { Roles, Department, Position, Designation, Allowance, Employee } from '../../data-operations/_sahred/models';
import { useAuth } from '../../_services/auth-context';

import EmployeeInstance from '../../data-operations/data-queries/employees';

function RegisterUser() {
	const { currentUser } = useAuth();
	const [ roles, setRoles ] = useState([ Roles ]);
	const [ departments, setDepartments ] = useState([ Department ]);
	const [ positions, setPositions ] = useState([ Position ]);
	const [ designations, setDesignations ] = useState([ Designation ]);
	const [ allowances, setAllowances ] = useState([ Allowance ]);
	const [ cardTypes, setCardTypes ] = useState([]);

	const queriesStore = Config(currentUser);
	const empInstance = EmployeeInstance(currentUser);

	function fetchInits() {
		queriesStore
			.getRoles()
			.then((res) => {
				setRoles(res.data);
				console.log(roles);
			})
			.catch((err) => {
				console.log('cannot fetch roles due to: ' + err);
			});
		queriesStore
			.getCardTypes()
			.then((res) => {
				setCardTypes(res.data);
				console.log(cardTypes);
			})
			.catch((err) => {
				console.log('cannot fetch cardTypes due to: ' + err);
			});

		queriesStore
			.getDepartments()
			.then((res) => {
				setDepartments(res.data);
				console.log(departments);
			})
			.catch((err) => {
				console.log('cannot fetch departments due to: ' + err);
			});
		queriesStore
			.getPositions()
			.then((res) => {
				setPositions(res.data);
				console.log(positions);
			})
			.catch((err) => {
				console.log('cannot fetch positions due to: ' + err);
			});
		queriesStore
			.getAllDesignation()
			.then((res) => {
				setDesignations(res.data);
				console.log(designations);
			})
			.catch((err) => {
				console.log('cannot fetch designations due to: ' + err);
			});
		queriesStore
			.getAllowances()
			.then((res) => {
				setAllowances(res.data);
				console.log(allowances);
			})
			.catch((err) => {
				console.log('cannot fetch allowances due to: ' + err);
			});
	}

	useEffect(() => {
		fetchInits();
	}, []);

	const { register, handleSubmit, errors } = useForm();

	const onSubmit = (data) => {
		console.log(data);
		const employee = {
			employee_id  : data.employee_id,
			email        : data.email,
			name         : data.name,
			cardType     : parseInt(data.cardtype),
			cardNumber   : data.cardnumber,
			phone        : data.phone,
			basic_salary : 0.0, //data.basic_salary,
			disable      : false,
			roles        : [ { role_id: parseInt(data.role) } ],
			positions    : [ { position_id: parseInt(data.position) } ],
			departments  : [ { department_id: parseInt(data.department) } ],
			allowances   : [ { allowance_id: parseInt(data.allowance) } ],
			designations : [ { designation_id: parseInt(data.designation) } ]
		};
		console.log(employee);

		empInstance
			.addEmployees(employee)
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return (
		<div className="registeruser">
			<h2>Register User</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-row">
					<div className="col-50 left-col">
						<h3>Personal Information</h3>
						<br />
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="employee_id">
									<i className="fa fa-user" /> Employee Id
								</label>
								<input
									name="employee_id"
									ref={register}
									type="text"
									id="ememployee_id"
									placeholder="001"
									required
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="fname">
									<i className="fa fa-user" /> Full Name
								</label>
								<input name="name" ref={register} type="text" id="fname" placeholder="Moe" required />
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="email">
									<i className="fa fa-envelope" /> Email
								</label>
								<input
									ref={register}
									name="email"
									type="text"
									id="email"
									placeholder="john@example.com"
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="ssnit"> SSNIT Number</label>
								<input ref={register} name="ssnit" type="text" id="ssnit" />
							</div>
						</div>

						<div className="form-row">
							<div className="col-10">
								<label htmlFor="zip">Zip</label>
								<input name="zip" type="text" id="zip" placeholder="+233" />
							</div>
							<div className="col-50">
								<label htmlFor="contact">Contact</label>
								<input
									name="phone"
									ref={register}
									type="text"
									id="contact"
									maxLength="10"
									placeholder="0541234567"
								/>
							</div>
						</div>
					</div>
					<div className="col-50">
						<h3>Other Details</h3>
						<br />
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="role">Role</label>
								<select ref={register} type="text" id="role" name="role">
									<option defaultValue disabled>
										choose option...
									</option>
									{roles.map((data) => {
										return (
											<option key={data.role_id} value={data.role_id}>
												{data.role}
											</option>
										);
									})}
								</select>
							</div>
							<div className="col-50">
								<label htmlFor="designation">Designation</label>
								<select ref={register} type="text" id="designation" name="designation">
									<option defaultValue disabled>
										choose option...
									</option>
									{designations.map((data) => {
										return (
											<option value={data.designation_id} key={data.designation_id}>
												{data.designation}
											</option>
										);
									})}
								</select>
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="basic-salary">Basic Salary</label>
								<select type="text" id="basic-salary" name="basic_salary">
									<option>choose option...</option>
								</select>
							</div>
							<div className="col-50">
								<label htmlFor="allowance">Allowance</label>
								<select ref={register} type="text" id="allowance" name="allowance">
									<option defaultValue disabled>
										choose option...
									</option>
									{allowances.map((data) => {
										return (
											<option value={data.allowance_id} key={data.allowance_id}>
												{data.allowance}
											</option>
										);
									})}
								</select>
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="department">Department</label>
								<select ref={register} type="text" id="department" name="department">
									<option defaultValue disabled>
										choose option...
									</option>
									{departments.map((data) => {
										return (
											<option value={data.department_id} key={data.department_id}>
												{data.department}
											</option>
										);
									})}
								</select>
							</div>
							<div className="col-50">
								<label htmlFor="position">Position</label>
								<select ref={register} type="text" id="position" name="position">
									<option defaultValue disabled>
										choose option...
									</option>
									{positions.map((data) => {
										return (
											<option value={data.position_id} key={data.position_id}>
												{data.position}
											</option>
										);
									})}
								</select>
							</div>
						</div>

						<div className="form-row">
							<div className="col-50">
								<label htmlFor="cardtype">National Card Type</label>
								<select ref={register} id="cardtype" name="cardtype" required>
									<option defaultValue disabled>
										Choose..
									</option>
									{cardTypes.map((card) => {
										return (
											<option value={cardTypes.indexOf(card)} key={card}>
												{card}
											</option>
										);
									})}
								</select>
							</div>
							<div className="col-50">
								<label htmlFor="cardnumber"> Card Number</label>
								<input ref={register} required type="text" id="cardnumber" name="cardnumber" />
							</div>
						</div>
					</div>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default RegisterUser;
