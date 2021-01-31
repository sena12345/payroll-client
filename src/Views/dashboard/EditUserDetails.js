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
import MultiSelect from 'react-multi-select-component';
import {
	ConvertedRoles,
	ConvertedDepartment,
	ConvertedDesignations
} from '../../data-operations/data-queries/converter';
function EditUserDetails() {
	const location = useLocation();
	const history = useHistory();
	const employee = location.state.data;
	const [ selectedDepartments, setSelectedDepartments ] = useState([]);
	const [ departments, setDepartments ] = useState([]);
	const [ selectedRoles, setSelectedRoles ] = useState([]);
	const [ roles, setRoles ] = useState([]);
	const [ selectedDesignations, setSelectedDesignations ] = useState([]);
	const [ designations, setDesignation ] = useState([]);
	const [ cardTypes, setCardTypes ] = useState([]);
	const { currentUser } = useAuth();
	const instance = Config(currentUser);
	const empInstance = EmployeeInstance(currentUser);
	const { register, handleSubmit, errors } = useForm();
	const [ loading, setLoading ] = useState(true);
	const alert = useAlert();

	// const departments  : [],
	// designations : [],
	// cardTypes    : []
	const defaultDepartment = [];
	employee.departments.forEach((d) => {
		defaultDepartment.push({ label: d.department, value: d.department_id });
	});
	const defaultDesignation = [];
	employee.designations.forEach((d) => {
		defaultDesignation.push({ label: d.designation, value: d.designation_id });
	});

	const init = () => {
		setSelectedRoles(ConvertedRoles(employee.roles));
		setSelectedDepartments(ConvertedDepartment(employee.departments));
		setSelectedDesignations(ConvertedDesignations(employee.designations));

		instance
			.getCardTypes()
			.then((res) => {
				setCardTypes(res.data);
			})
			.catch((err) => {
				alert.error(`oops failed to load cardTypes ${err.message}`);
			});
		instance
			.getDepartments()
			.then((res) => {
				setDepartments(ConvertedDepartment(res.data));
			})
			.catch((err) => alert.error(`oops failed to load departments ${err.message}`));
		instance
			.getAllDesignation()
			.then((res) => {
				setDesignation(ConvertedDesignations(res.data));
			})
			.catch((err) => alert.error(`oops failed to load cardTypes ${err.message}`));
		instance
			.getRoles()
			.then((res) => {
				setRoles(ConvertedRoles(res.data));
			})
			.catch((err) => alert.error(`oops failed to load roles ${err.message}`));
	};

	useEffect(
		() => {
			if (loading) {
				init();
				console.log('running...');
			}
			return () => {
				setLoading(false);
			};
		},
		[ loading, init ]
	);

	// const removeByAttr = function(arr, attr, value) {
	// 	let i = arr.length;
	// 	while (i--) {
	// 		if (arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value)) {
	// 			arr.splice(i, 1);
	// 		}
	// 	}
	// 	return arr;
	// };

	// const handleChange = (e) => {
	// 	let { options } = e.target;
	// 	options = Array.apply(null, options);
	// 	const selectedValues = options.filter((x) => x.selected).map((x) => x.value);
	// 	return selectedValues;
	// };

	// const handleChange = (e) => {
	// 	let { options } = e.target;
	// 	options = Array.apply(null, options);
	// 	const selectedValues = options.filter((x) => x.selected).map((x) => x.value);
	// 	return selectedValues;
	// };

	const onSubmit = (data) => {
		setLoading(true);
		let rolesData = [];
		// rolesData.push(...employee.roles);
		selectedRoles.forEach((rol) => {
			rolesData.push({ role_id: parseInt(rol.value) });
		});
		let departmentData = [];
		// departmentData.push(...employee.departments);
		selectedDepartments.forEach((dep) => {
			departmentData.push({ department_id: parseInt(dep.value) });
		});
		let designationData = [];
		// designationData.push(...employee.designations);
		selectedDesignations.forEach((des) => {
			designationData.push({ designation_id: parseInt(des.value) });
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
			<h5>
				Modify <b>{employee.name}</b>
			</h5>
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
									defaultValue={employee.employee_id}
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
								<label htmlFor="cardtype">National Card Type</label>
								<select className="form-select" ref={register} id="cardtype" name="cardType">
									<option className="form-option" defaultValue disabled>
										choose option...
									</option>
									{cardTypes.map((card) => {
										return (
											<option
												selected={employee.cardType === card}
												className="form-option"
												key={card}
												value={cardTypes.indexOf(card)}
											>
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
					</div>
					<div className="col-50">
						<b>Other Details</b>
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
								<label htmlFor="department">Department</label>
								<MultiSelect
									options={departments}
									value={selectedDepartments}
									onChange={setSelectedDepartments}
									labelledBy={'Select'}
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="designation">Designation</label>
								<MultiSelect
									options={designations}
									value={selectedDesignations}
									onChange={setSelectedDesignations}
									labelledBy={'Select'}
								/>
							</div>
						</div>

						<div className="form-row">
							<div className="col-50">
								<label htmlFor="role">Roles</label>
								<MultiSelect
									options={roles}
									value={selectedRoles}
									onChange={setSelectedRoles}
									labelledBy={'Select'}
								/>
							</div>
						</div>
						<div className="col-50">
							<input type="submit" value="Submit" className="form-btn" />
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default EditUserDetails;
