import '../../assets/css/Form.css';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Config from '../../data-operations/data-queries/config';
import { Roles, Department, Position, Designation, Allowance } from '../../data-operations/_sahred/models';
import { useAuth } from '../../_services/auth-context';

import EmployeeInstance from '../../data-operations/data-queries/employees';
import { showConfirmAlert } from '../my-alerts';
import { useAlert } from 'react-alert';
import { MyLoader } from './my-spiner';
function RegisterUser() {
	const { currentUser } = useAuth();
	const alert = useAlert();
	const [ roles, setRoles ] = useState([ Roles ]);
	const [ departments, setDepartments ] = useState([ Department ]);
	const [ designations, setDesignations ] = useState([ Designation ]);
	const [ sortedDesignations, setSortedDesignations ] = useState([ Designation ]);
	const [ cardTypes, setCardTypes ] = useState([]);
	const [ isEnabled, setEnabled ] = useState(false);
	const [ loading, setLoading ] = useState(true);

	const queriesStore = Config(currentUser);
	const empInstance = EmployeeInstance(currentUser);
	const { register, handleSubmit, errors, reset } = useForm();

	function fetchInits() {
		queriesStore
			.getRoles()
			.then((res) => {
				setRoles(res.data);
			})
			.catch((err) => {
				alert.error(`oops failed to load roles ${err.message}`);
			});
		queriesStore
			.getCardTypes()
			.then((res) => {
				setCardTypes(res.data);
			})
			.catch((err) => {
				alert.error(`oops failed to load cardTypes ${err.message}`);
			});

		queriesStore
			.getDepartments()
			.then((res) => {
				setDepartments(res.data);
			})
			.catch((err) => {
				alert.error(`oops failed to load departments ${err.message}`);
			});

		queriesStore
			.getAllDesignation()
			.then((res) => {
				setDesignations(res.data);

				setLoading(false);
			})
			.catch((err) => {
				alert.error(`oops failed to load designations ${err.message}`);
				setLoading(false);
			});
	}

	useEffect(() => {
		fetchInits();
	}, []);

	const onSubmit = (data) => {
		const employee = {
			employee_id   : data.employee_id,
			email         : data.email,
			name          : data.name,
			gender        : data.gender,
			ssnit         : data.ssnit,
			cardType      : parseInt(data.cardtype),
			cardNumber    : data.cardnumber,
			phone         : data.phone,
			basic_salary  : parseFloat(data.basic_salary),
			disable       : isEnabled,
			marriage_cert : data.marriage_certificate,
			tin           : data.tin_number,
			roles         : data.role ? [ { role_id: parseInt(data.role) } ] : [],

			departments   : data.department ? [ { department_id: parseInt(data.department) } ] : [],
			// allowances    : data.allowance ? [ { allowance_id: parseInt(data.allowance) } ] : [],
			designations  : data.designation ? [ { designation_id: parseInt(data.designation) } ] : []
		};
		setLoading(true);
		empInstance
			.addEmployees(employee)
			.then((res) => {
				alert.success(`${res.data.name} data submited successfully!`);
				reset();
				setLoading(false);
			})
			.catch((err) => {
				alert.error(`error due to ${err.message}`);
				setLoading(false);
			});
	};

	const handleSetDesignation = (val) => {
		const sortData = [];
		designations.forEach((des) => {
			console.log('des: ', des.departments.department, val.target.value);
			if (des.departments.department_id == val.target.value) {
				sortData.push(des);
			}
		});
		setSortedDesignations(sortData);
	};

	const handleConfirm = (data) => {
		showConfirmAlert({
			title   : 'confirmation',
			message : `Continue to add ${data.name} to employees?`,
			buttons : [
				{
					label   : 'No',
					onClick : () => {
						console.log('cancel');
					}
				},
				{
					label   : 'Yes',
					onClick : () => {
						onSubmit(data);
					}
				}
			]
		});
	};

	return loading ? (
		<MyLoader />
	) : (
		<div className="registeruser">
			<div>
				<h5>Register User</h5>
				<hr />
				<br />
				<form onSubmit={handleSubmit(handleConfirm)}>
					<div className="form-row">
						<div className="col-50 left-col">
							<b>Personal Information</b>
							<br />
							<div className="form-row">
								<div className="col-50">
									<label htmlFor="employee-id">
										<i className="fa fa-id-badge" /> Employee ID
									</label>
									<input
										ref={register({ required: true })}
										name="employee_id"
										type="text"
										id="employee-id"
									/>
									{errors.employee_id && <p className="valid">This is required</p>}
								</div>
							</div>
							<div className="form-row">
								<div className="col-50">
									<label htmlFor="fname">
										<i className="fa fa-user" /> Full Name
									</label>
									<input
										ref={register({ required: true, minLength: 4 })}
										name="name"
										type="text"
										id="fname"
										placeholder="Moe"
									/>
									{errors.name && <p className="valid">This is required (min = 4)</p>}
								</div>
							</div>
							<div className="form-row">
								<div className="col-50">
									<label htmlFor="email">
										<i className="fa fa-envelope" /> Email
									</label>
									<input
										ref={register({ required: true })}
										name="email"
										type="email"
										id="email"
										placeholder="john@example.com"
									/>
									{errors.email && <p className="valid">This is required for valid email!</p>}
								</div>
							</div>
							<div className="form-row">
								<div className="col-50">
									<label htmlFor="ssnit">
										{' '}
										<i className="fas fa-money-check" /> SSNIT Number
									</label>
									<input ref={register({ required: true })} name="ssnit" type="text" id="ssnit" />
									{errors.ssnit && <p className="valid">SSNIT number is required</p>}
								</div>
							</div>

							<div className="form-row">
								<div className="col-50">
									<label htmlFor="contact">
										<i className="fa fa-phone-alt" /> Contact
									</label>
									<input
										ref={register({ maxLength: 16 })}
										name="phone"
										type="text"
										id="contact"
										placeholder="XXXXXXXXXXXX"
									/>
								</div>
							</div>
						</div>
						<div className="col-50">
							<b>Other Details</b>
							<br />
							<div className="form-row">
								<div className="col-50">
									<label htmlFor="department">Department</label>
									<select
										ref={register}
										type="text"
										id="department"
										name="department"
										onChange={(val) => handleSetDesignation(val)}
									>
										<option />
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
									<label htmlFor="designation">Designation</label>
									<select ref={register} type="text" id="designation" name="designation">
										<option defaultValue disabled>
											choose option...
										</option>
										{sortedDesignations.map((designation) => {
											return (
												<option
													key={designation.designation_id}
													value={designation.designation_id}
												>
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
							</div>
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
									<label htmlFor="gender">Gender</label>
									<select ref={register} type="text" id="gender" name="gender">
										<option disabled>choose option...</option>
										<option value={0}>Female</option>
										<option value={1}>Male</option>
										<option value={2}>Others</option>
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
									<input
										ref={register({ required: true })}
										type="text"
										id="cardnumber"
										name="cardnumber"
									/>
									{errors.cardnumber && <p className="valid">ID number is required!</p>}
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
									<label htmlFor="enable-user-check">
										<input
											ref={register}
											defaultChecked="true"
											onChange={(e) => {
												setEnabled(e.target.checked);
											}}
											type="checkbox"
											id="enable-user-check"
											name="disbale_employee"
										/>
										<b>Enable Employee</b>
									</label>
								</div>
							</div>
						</div>
					</div>

					<input type="submit" value="Register" className="form-btn" />
				</form>
			</div>
		</div>
	);
}

export default RegisterUser;
