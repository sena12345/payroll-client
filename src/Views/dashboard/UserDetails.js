import React from 'react';
import '../../assets/css/Form.css';
import { Link } from 'react-router-dom';

function UserDetails() {
    
return (
		<div className="userdetails">
			<h2> View User Details</h2>
			<br />

			<form>
				<div className="form-row">
					<div className="col-50 left-col">
						<h3>Personal Information</h3>
						<br />
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="employee-id">
									<i className="fa fa-id-badge" /> Employee ID
								</label>
								<input disabled name="employee_id" type="text" id="employee-id" />
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="fname">
									<i className="fa fa-user" /> Full Name
								</label>
								<input disabled  name="name" type="text" id="fname" placeholder="Moe" />
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="email">
									<i className="fa fa-envelope" /> Email
								</label>
								<input disabled
									
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
									<i className="fas fa-money-check" /> SSNIT Number
								</label>
								<input disabled  name="ssnit" type="text" id="ssnit" />
							</div>
						</div>

						<div className="form-row">
							<div className="col-50">
								<label htmlFor="contact">
									<i className="fa fa-phone-alt" /> Contact
								</label>
								<input disabled
									
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
								<input disabled  type="text" id="role" name="role"/>
							</div>
							<div className="col-50">
								<label htmlFor="designation">Designation</label>
								<input disabled  type="text" id="designation" name="designation"/>
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="basic-salary">Basic Salary</label>
								<input disabled
									
									type="text"
									id="basic-salary"
									name="basic_salary"
									placeholder="0.0"
								/>
							</div>
							<div className="col-50">
								<label htmlFor="allowance">Allowance</label>
								<input disabled  type="text" id="allowance" name="allowance"/>
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="department">Department</label>
								<input disabled  type="text" id="department" name="department"/>									
							</div>
							<div className="col-50">
								<label htmlFor="position">Position</label>
								<input disabled  type="text" id="position" name="position"/>
							</div>
						</div>

						<div className="form-row">
							<div className="col-50">
								<label htmlFor="cardtype">National Card Type</label>
								<input disabled type="text"  id="cardtype" name="cardtype"/>
							</div>
							<div className="col-50">
								<label htmlFor="cardnumber"> Card Number</label>
								<input disabled  type="text" id="cardnumber" name="cardnumber" />
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="marriage-cert">Marriage Certificate Number</label>
								<input disabled  type="text" id="marriage-cert" name="marriage_certificate" />
							</div>
							<div className="col-50">
								<label htmlFor="tin-number"> Tin Number</label>
								<input disabled  type="text" id="tin-number" name="tin_number" />
							</div>
						</div>
						<div className="form-row">
							<div className="col-50">
								<label htmlFor="enable-user-check"> Enable Employee</label>
								<input disabled
									
									defaultChecked="true"
									type="checkbox"
									id="enable-user-check"
									name="disable_employee"
								/>
							</div>
						</div>
					</div>
			</div>
			<Link to="/edituserdetails">
				<input type="submit" value="Edit User" className="form-btn" />
			</Link>
				
			</form>
		</div>
	);
}

export default UserDetails;