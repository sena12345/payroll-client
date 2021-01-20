import React, { useState, useEffect } from 'react';
import './RegisterUser.css';
import Config from '../../data-operations/data-queries/config';
import { Roles, Department, Position, Designation, Allowance } from '../../data-operations/_sahred/models';
import { useAuth } from '../../_services/auth-context';

function RegisterUser() {
	const effect = -1;
	const { currentUser } = useAuth();
	const [ roles, setRoles ] = useState([ Roles ]);
	const [ departments, setDepartments ] = useState([ Department ]);
	const [ positions, setPositions ] = useState([ Position ]);
	const [ designations, setDesignations ] = useState([ Designation ]);
	const [ allowances, setAllowances ] = useState([ Allowance ]);
	const [ cardTypes, setCardTypes ] = useState();

	const queriesStore = Config(currentUser);

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

	useEffect(
		() => {
			fetchInits();
		},
		[ effect + 1 ]
	);

	return (
		<div className="registeruser">
			<h2>Register User</h2>

			<form>
				<div className="form-row">
					<div className="col-50">
						<h3>Personal Information</h3>
						<br />
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="fname">
									<i className="fa fa-user" /> Full Name
								</label>
								<input type="text" id="fname" placeholder="Moe" />
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="email">
									<i className="fa fa-envelope" /> Email
								</label>
								<input type="text" id="email" placeholder="john@example.com" />
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="ssnit"> SSNIT Number</label>
								<input type="text" id="ssnit" />
							</div>
						</div>

						<div className="form-row">
							<div className="col-10">
								<label htmlFor="zip">Zip</label>
								<input type="text" id="zip" placeholder="+233" />
							</div>
							<div className="col-50">
								<label htmlFor="contact">Contact</label>
								<input type="text" id="contact" maxLength="10" placeholder="0541234567" />
							</div>
						</div>
					</div>
					<div className="col-50">
						<h3>Other Details</h3>
						<br />
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="role">Role</label>
								<input type="text" id="role" name="role" />
							</div>
							<div className="col-50">
								<label htmlFor="designation">Designation</label>
								<input type="text" id="designation" name="designation" />
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="basic-salary">Basic Salary</label>
								<input type="text" id="basic-salary" name="basic-salary" />
							</div>
							<div className="col-50">
								<label htmlFor="allowance">Allowance</label>
								<input type="text" id="allowance" name="allowance" />
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="department">Department</label>
								<input type="text" id="department" name="department" />
							</div>
							<div className="col-50">
								<label htmlFor="position">Position</label>
								<input type="text" id="position" name="position" />
							</div>
						</div>

						<div className="form-row">
							<div className="col-50">
								<label htmlFor="cardtype">National Card Type</label>
								<select id="cardtype" name="cardtype">
									<option>Choose..</option>
									{cardTypes.map((card) => {
										return <option>{card}</option>;
									})}
								</select>
							</div>
							<div className="col-50">
								<label htmlFor="cardnumber">National Card Number</label>
								<input type="text" id="cardnumber" name="cardnumber" />
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
