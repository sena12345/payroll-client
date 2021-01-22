
import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import EmployeeInstance from '../../data-operations/data-queries/employees';
import { Employee } from '../../data-operations/_sahred/models';
import { useAuth } from '../../_services/auth-context';
function ViewUsers() {
	const { currentUser } = useAuth();
	const empInstance = EmployeeInstance(currentUser);
	const [ employeesData, setEmployeesData ] = useState([ Employee ]);

	useEffect(() => {
		empInstance.getEmployees().then((res) => {
			setEmployeesData(res.data.content);
			console.log(employeesData);
		});
	}, []);

	const disableEmployee = (employee) => {
		const employees = [ employee ];

		if (!window.confirm(`Continue to change ${employee.name} state?`)) return;

		empInstance
			.disableEmployees(employees)
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
  
 function switchButtonState() {}
  
	return (
		    <div className="Viewusers">
      <div className="action-btn-container ">
             
        <span className="enable-disable">Disabled</span> <label className="toggle">
            <input type="checkbox"/>
            <span className="slider"></span>
        </label> <span className="enable-disable">Enabled</span>
      
        <button title="Disable Selected" className="btn bg-primary float-right">
          Disable All <i className="fa fa-times"></i>
        </button>
        <button title="Delete Selected" className="btn bg-danger float-right">
          Delete All <i className="fa fa-trash"></i>
        </button>
      </div>
      <br />

			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Full Name</th>
						<th>Email</th>
						<th>Employee ID</th>
						<th>Position</th>
						<th>Department</th>
						<th>Salary</th>
						<th>Allowance</th>
						<th>Designation</th>
						<th>Roles</th>
						<th />
						<th />
						<th />

						<th />
						<th />
					</tr>
				</thead>
				<tbody>
					{employeesData.length > 0 ? (
						employeesData.map((emp) => {
							const index = employeesData.indexOf(emp) + 1;
							return (
								<tr key={index}>
									<td>{index}</td>
									<td>
										{emp.name} <pre>{emp.disable ? 'Disabled' : ''}</pre>
									</td>
									<td>{emp.email}</td>
									<td>{emp.employee_id}</td>
									<td>
										{emp.positions.map((positions) => {
											return positions.position;
										})}
									</td>
									<td>
										{emp.departments.map((departments) => {
											return departments.department;
										})}
									</td>
									<td>{emp.basic_salary}</td>
									<td>
										{emp.allowances.map((allowances) => {
											return (
												<pre key={emp.allowances.indexOf(allowances)}>
													{allowances.allowance}
												</pre>
											);
										})}
									</td>
									<td>
										{emp.designations.map((designations) => {
											return designations.designation;
										})}
									</td>
									<td>
										{emp.roles.map((role) => {
											return role.role;
										})}
									</td>
									<td>
										<input type="checkbox" className="disable-btn-check" value="" />
									</td>
									<td>
										<button title="View Details" className="btn bg-success">
											<i className="fa fa-eye" />
										</button>
									</td>
									<td>
										<button title="Edit Details" className="btn bg-warning">
											<i className="fa fa-pen" />
										</button>
									</td>
									<td>
										<button
											title="Disable Employee"
											className="btn bg-primary"
											onClick={() => {
												disableEmployee(emp);
											}}
										>
											<i className="fa fa-times" />
										</button>
									</td>
									<td>
										<button title="Delete Employee" className="btn bg-danger">
											<i className="fa fa-trash" />
										</button>
									</td>
								</tr>
							);
						})
					) : (
						<tr>No data found</tr>
					)}
				</tbody>
			</table>
		</div>
	);

}
export default ViewUsers;
