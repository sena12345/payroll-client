import '../../assets/css/RegisterUser.css';
import React, { useState, useEffect } from 'react';
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
	const [ isEnabled, setEnabled ] = useState(false);

	const queriesStore = Config(currentUser);
	const empInstance = EmployeeInstance(currentUser);
	const { register, handleSubmit, error } = useForm();

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

	const onSubmit = (data) => {
		console.log(data);
		const employee = {
			employee_id   : data.employee_id,
			email         : data.email,
			name          : data.name,
			ssnit         : data.ssnit,
			cardType      : parseInt(data.cardtype),
			cardNumber    : data.cardnumber,
			phone         : data.phone,
			basic_salary  : data.basic_salary,
			disable       : isEnabled,
			marriage_cert : data.marriage_certificate,
			tin           : data.tin_number,
			roles         : data.role ? [ { role_id: parseInt(data.role) } ] : [],
			positions     : data.position ? [ { position_id: parseInt(data.position) } ] : [],
			departments   : data.department ? [ { department_id: parseInt(data.department) } ] : [],
			allowances    : data.allowance ? [ { allowance_id: parseInt(data.allowance) } ] : [],
			designations  : data.designation ? [ { designation_id: parseInt(data.designation) } ] : []
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
			<br />

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-row">
					<div className="col-50 left-col">
						<h3>Personal Information</h3>
						<br />
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="employee-id">
									<i className="fa fa-id-badge" /> Employee ID
								</label>
								<input ref={register} name="employee_id" type="text" id="employee-id" />
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="fname">
									<i className="fa fa-user" /> Full Name
								</label>
								<input ref={register} name="name" type="text" id="fname" placeholder="Moe" />
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
								<label htmlFor="ssnit">
									{' '}
									<i className="fas fa-money-check" /> SSNIT Number
								</label>
								<input ref={register} name="ssnit" type="text" id="ssnit" />
							</div>
						</div>

						<div className="form-row">
							<div className="col-50">
								<label htmlFor="contact">
									<i className="fa fa-phone-alt" /> Contact
								</label>
								<input
									ref={register}
									name="phone"
									type="text"
									id="contact"
									maxLength="10"
									placeholder="XXXXXXXXXXXX"
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

									{roles.map((role) => {
										return (
											<option key={role.role_id} value={role.role_id}>
												{role.role}
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
									{designations.map((designation) => {
										return (
											<option key={designation.designation_id} value={designation.designation_id}>
												{designation.designation}
											</option>
										);
									})}
								</select>
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="basic-salary">Basic Salary</label>
								<input
									ref={register}
									type="text"
									id="basic-salary"
									name="basic_salary"
									placeholder="0.0"
								/>
							</div>
							<div className="col-50">
								<label htmlFor="allowance">Allowance</label>
								<select ref={register} type="text" id="allowance" name="allowance">
									<option defaultValue disabled>
										choose option...
									</option>
									{allowances.map((allowance) => {
										return (
											<option key={allowance.allowance} value={allowance.allowance_id}>
												{allowance.allowance}
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
									{departments.map((department) => {
										return (
											<option key={department.department} value={department.department_id}>
												{department.department}
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
									{positions.map((position) => {
										return (
											<option key={position.position_id} value={position.position_id}>
												{position.position}
											</option>
										);
									})}
								</select>
							</div>
						</div>

						<div className="form-row">
							<div className="col-50">
								<label htmlFor="cardtype">National Card Type</label>
								<select ref={register} id="cardtype" name="cardtype">
									<option defaultValue disabled>
										choose option...
									</option>
									{cardTypes.map((card) => {
										return (
											<option key={card} value={cardTypes.indexOf(card)}>
												{card}
											</option>
										);
									})}
								</select>
							</div>
							<div className="col-50">
								<label htmlFor="cardnumber"> Card Number</label>
								<input ref={register} type="text" id="cardnumber" name="cardnumber" />
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="marriage-cert">Marriage Certificate Number</label>
								<input ref={register} type="text" id="marriage-cert" name="marriage_certificate" />
							</div>
							<div className="col-50">
								<label htmlFor="tin-number"> Tin Number</label>
								<input ref={register} type="text" id="tin-number" name="tin_number" />
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="enable-user-check"> Enable Employee</label>
								<input
									ref={register}
									defaultChecked="true"
									onChange={(e) => {
										setEnabled(!isEnabled);
									}}
									type="checkbox"
									id="enable-user-check"
									name="disbale_employee"
								/>
							</div>
						</div>
					</div>
				</div>
				<input type="submit" value="Register" className="register-form-btn" />
			</form>
		</div>
	);
}

export default RegisterUser;
