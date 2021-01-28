import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Image from '../../assets/images/avataaars.png';
import '../../assets/css/Form.css';

import { useAuth } from '../../_services/auth-context';

function UserDetails() {
	const { logout, resetPassword, currentUser } = useAuth();

	const location = useLocation();
	const employee = location.state.data;

	return (
		<div id="printform" className="userdetails">
			<div className="container">
				<h3>Employee Details</h3>
				<hr />
				<br />
				<form>
					<div className="personal-section">
						<div className="form-row">
							<div className="left-col">
								<div className="form-row">
									<div className="col-25">
										<div className="imgcontainer">
											<img src={currentUser.photoURL} alt="image" className="image" />
										</div>
										<div className="details-box">
											<label htmlFor="username">
												<b>Employee ID :</b>
											</label>
											<pre id="username">
												<i>{employee.employee_id}</i>
											</pre>
										</div>
									</div>
								</div>
							</div>
							<div className="col-50">
								<div className="form-row">
									<div className="col-50">
										<div className="details-box">
											<label htmlFor="username">
												<b>Full Name :</b>
											</label>
											<pre id="username">
												<i>{employee.name}</i>
											</pre>
										</div>
										<div className="details-box">
											<label htmlFor="username">
												<b>Email :</b>
											</label>
											<pre id="username">
												<i>{employee.email}</i>
											</pre>
										</div>
										<div className="details-box">
											<label htmlFor="username">
												<b>Contact :</b>
											</label>
											<pre id="username">
												<i>{employee.phone}</i>
											</pre>
										</div>
										<div className="details-box">
											<label htmlFor="username">
												<b>Gender :</b>
											</label>
											<pre id="username">
												<i>{employee.gender}</i>
											</pre>
										</div>
										<div className="details-box">
											<label htmlFor="username">
												<b>SSNIT Number :</b>
											</label>
											<pre id="username">
												<i>{employee.ssnit}</i>
											</pre>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="department-section">
						<div className="form-row">
							<div className="col-50 left-col">
								<div className="form-row">
									<div className="col-50">
										<table>
											<tbody>
												<tr>
													<th>Departments</th>
												</tr>
												{employee.departments.map((dep) => {
													return (
														<tr key={dep.department_id}>
															<td>{dep.department}</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
									<div className="col-50">
										<table>
											<tbody>
												<tr>
													<th>Designations</th>
												</tr>

												{employee.designations.map((des) => {
													return (
														<tr key={des.designation_id}>
															<td>{des.designation}</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div className="col-50">
								<div className="form-row">
									<div className="col-50">
										<table>
											<tbody>
												<tr>
													<th>Roles</th>
												</tr>
												{employee.roles.map((r) => {
													return (
														<tr key={r.rolde_id}>
															<td>{r.role}</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default UserDetails;
