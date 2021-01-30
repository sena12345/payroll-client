import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../../assets/css/Form.css';
import { useAuth } from '../../_services/auth-context';
import Config from '../../data-operations/data-queries/config';
import { useForm } from 'react-hook-form';
import { MyLoader } from './my-spiner';
import EmployeeInstance from '../../data-operations/data-queries/employees';
import { useAlert } from 'react-alert';
import { showConfirmAlert } from '../my-alerts';

function EditUserDetails() {
	const location = useLocation();
	const history = useHistory();
	const employee = location.state.data;
	const [ departments, setDepartments ] = useState([]);
	const [ roles, setRoles ] = useState([]);
	const [ designations, setDesignation ] = useState([]);
	const [ cardTypes, setCardTypes ] = useState([]);
	const { currentUser } = useAuth();
	const instance = Config(currentUser);
	const empInstance = EmployeeInstance(currentUser);
	const { register, handleSubmit, errors, reset } = useForm();
	const [ loading, setLoading ] = useState(true);
	const alert = useAlert();

	useEffect(() => {
		instance
			.getCardTypes()
			.then((res) => {
				setCardTypes(res.data);
			})
			.catch((err) => {
				alert.error(`oops failed to load cardTypes ${err.message}`);
			});
		instance.getDepartments().then((res) => {
			setDepartments(res.data);
		});
		instance.getAllDesignation().then((res) => {
			setDesignation(res.data);
		});
		instance.getRoles().then((res) => {
			setRoles(res.data);
			setLoading(false);
		});
	}, []);

	const removeByAttr = function(arr, attr, value) {
		let i = arr.length;
		while (i--) {
			if (arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value)) {
				arr.splice(i, 1);
			}
		}
		return arr;
	};

	// const handleChange = (e) => {
	// 	let { options } = e.target;
	// 	options = Array.apply(null, options);
	// 	const selectedValues = options.filter((x) => x.selected).map((x) => x.value);
	// 	return selectedValues;
	// };

	const onSubmit = (data) => {
		setLoading(true);
		let rolesData = [];
		rolesData.push(...employee.roles);
		data.roles.forEach((rol) => {
			rolesData.push({ role_id: parseInt(rol) });
		});
		let departmentData = [];
		departmentData.push(...employee.departments);
		data.departments.forEach((dep) => {
			departmentData.push({ department_id: parseInt(dep) });
		});
		let designationData = [];
		designationData.push(...employee.designations);
		data.desigantions.forEach((des) => {
			designationData.push({ designation_id: parseInt(des) });
		});
		const employeeData = {
			uid           : employee.uid,
			employee_id   : data.employee_id,
			email         : data.email,
			name          : data.name,
			gender        : parseInt(data.gender),
			ssnit         : data.ssnit,
			cardType      : parseInt(data.cardType),
			cardNumber    : data.cardNumber,
			phone         : data.phone,
			basic_salary  : parseFloat(data.basic_salary),
			marriage_cert : data.marriage_cert,
			tin           : data.tin,
			roles         : rolesData,
			disable       : employee.disable,
			departments   : departmentData,
			// allowances    : data.allowance ? [ { allowance_id: parseInt(data.allowance) } ] : [],
			designations  : designationData
		};
		console.log(employeeData);
		empInstance
			.updateEmployee(employeeData)
			.then((res) => {
				console.log(res.data);
				setLoading(false);
				alert.success('Data updated successfully..');
				history.push('/viewusers');
			})
			.catch((err) => {
				setLoading(false);
				alert.error('oops ' + err.message);
			});
	};

	const handleConfirm = (data) => {
		showConfirmAlert({
			title   : 'confirmation',
			message : `Continue to add ${data.name} to employees ?`,
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
		<div className="edituserdetails">
			<h2>Edit User Details</h2>
			<br />

			<form onSubmit={handleSubmit(handleConfirm)}>
				<div className="form-row">
					<div className="col-50 left-col">
						<h3>Personal Information</h3>
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
									defaultValue={employee.employee_id}
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="fname">
									<i className="fa fa-user" /> Full Name
								</label>
								<input
									ref={register({ required: true })}
									name="name"
									type="text"
									id="fname"
									placeholder="Moe"
									defaultValue={employee.name}
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="email">
									<i className="fa fa-envelope" /> Email
								</label>
								<input
									ref={register({ required: true })}
									defaultValue={employee.email}
									name="email"
									type="text"
									id="email"
									placeholder="john@example.com"
								/>
							</div>
							<div className="col-50">
								<label htmlFor="gender">Gender</label>
								<select className="form-select" ref={register} type="text" id="gender" name="gender">
									<option disabled>choose option...</option>
									<option value={0}>Female</option>
									<option value={1}>Male</option>
									<option value={2}>Others</option>
								</select>
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="ssnit">
									<i className="fas fa-money-check" /> SSNIT Number
								</label>
								<input
									ref={register}
									name="ssnit"
									type="text"
									id="ssnit"
									defaultValue={employee.ssnit}
								/>
							</div>
						</div>

						<div className="form-row">
							<div className="col-50">
								<label htmlFor="contact">
									<i className="fa fa-phone-alt" /> Contact
								</label>
								<input
									ref={register}
									defaultValue={employee.phone}
									name="phone"
									type="tel"
									id="phone"
									maxLength="16"
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
								<label htmlFor="basic-salary">Basic Salary</label>
								<input
									ref={register}
									defaultValue={employee.basic_salary}
									type="text"
									id="basic-salary"
									name="basic_salary"
									placeholder="0.0"
								/>
							</div>
						</div>

						<div className="form-row">
							<div className="col-50">
								<label htmlFor="cardtype">National Card Type</label>
								<select className="form-select" ref={register} id="cardtype" name="cardType">
									<option className="form-option" defaultValue disabled>
										choose option...
									</option>
									{cardTypes.map((card) => {
										return (
											<option className="form-option" key={card} value={cardTypes.indexOf(card)}>
												{card}
											</option>
										);
									})}
								</select>
							</div>
							<div className="col-50">
								<label htmlFor="cardnumber"> Card Number</label>
								<input
									defaultValue={employee.cardNumber}
									ref={register({ required: true })}
									type="text"
									id="cardnumber"
									name="cardNumber"
								/>
								{errors.cardnumber && <p className="valid">ID number is required!</p>}
							</div>
						</div>

						<div className="form-row">
							<div className="col-50">
								<label htmlFor="marriage-cert">Marriage Certificate Number</label>
								<input
									ref={register}
									type="text"
									id="marriage-cert"
									name="marriage_cert"
									defaultValue={employee.marriage_cert}
								/>
							</div>
							<div className="col-50">
								<label htmlFor="tin-number"> Tin Number</label>
								<input
									ref={register}
									type="text"
									id="tin-number"
									name="tin"
									defaultValue={employee.tin}
								/>
							</div>
						</div>

						<div className="form-row">
							<div className="col-50">
								<label htmlFor="department">Department</label>
								<select ref={register} multiple name="departments">
									{departments.map((dep) => {
										return (
											<option
												className="form-option"
												key={dep.department_id}
												value={dep.department_id}
											>
												{dep.department}
											</option>
										);
									})}
								</select>
							</div>
							<div className="col-50">
								<table>
									<thead>
										<tr>
											<th>
												<p>Current departments</p>
											</th>
										</tr>
									</thead>
								</table>
								<ol>
									{employee.departments.map((d) => {
										return (
											<li key={d.department_id}>
												<p>
													{d.department}
													<button type="button" className="float-right">
														<i
															className="fa fa-trash"
															onClick={(e) => {
																employee.departments.pop(d);
															}}
														/>
													</button>
												</p>
											</li>
										);
									})}
								</ol>
							</div>
						</div>

						<div className="form-row">
							<div className="col-50">
								<label htmlFor="designation">Designation</label>
								<select ref={register} id="designation" name="desigantions" multiple>
									{designations.map((des) => {
										return (
											<option
												className="form-option"
												key={des.designation_id}
												value={des.designation_id}
											>
												{des.designation}
											</option>
										);
									})}
								</select>
							</div>
							<div className="col-50">
								<table>
									<tbody>
										<tr>
											<th>
												<p>Current Designations</p>
											</th>
										</tr>
									</tbody>
								</table>
								<ol>
									{employee.designations.map((des) => {
										return (
											<li key={des.designation_id}>
												<p>
													{des.designation}{' '}
													<button
														type="button"
														className="float-right"
														onClick={(e) => {
															removeByAttr(
																employee.designations,
																'designation_id',
																des.designation_id
															);
														}}
													>
														<i className="fa fa-trash" />
													</button>
												</p>
											</li>
										);
									})}
								</ol>
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="role">Roles</label>
								<select ref={register} type="text" id="role" name="roles" multiple>
									{roles.map((rol) => {
										return (
											<option className="form-option" key={rol.role_id} value={rol.role_id}>
												{rol.role}
											</option>
										);
									})}
								</select>
							</div>
							<div className="col-50">
								<table>
									<tbody>
										<tr>
											<th>
												<p>Current Roles</p>
											</th>
										</tr>
									</tbody>
								</table>
								<ol>
									{employee.roles.map((rol) => {
										return (
											<li key={rol.role_id}>
												<p>
													{rol.role}
													<button className="float-right" type="button">
														<i className="fa fa-trash" />
													</button>
												</p>
											</li>
										);
									})}
								</ol>
							</div>
						</div>
					</div>
				</div>
				<input type="submit" value="Submit" className="form-btn" />
			</form>
		</div>
	);
}

export default EditUserDetails;
