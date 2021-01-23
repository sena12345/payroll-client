import React, { useEffect, useState } from 'react';
import EmployeeInstance from '../../data-operations/data-queries/employees';
import { Employee } from '../../data-operations/_sahred/models';
import { useAuth } from '../../_services/auth-context';
function ViewUsers() {
	const { currentUser } = useAuth();
	const empInstance = EmployeeInstance(currentUser);
	const [ employeesData, setEmployeesData ] = useState([]);
	const [ load, setLoading ] = useState('true');
	const selectedEmployees = [];
	useEffect(
		() => {
			empInstance.getEmployees().then((res) => {
				if (load) {
					setEmployeesData(res.data.content);
					console.log(employeesData);
					setLoading(false);
				}
			});
		},
		[ load ]
	);

	const disableEmployee = (employee) => {
		const employees = [ employee ];

		if (!window.confirm(`Continue to change ${employee.name} state?`)) return;

		empInstance
			.disableEmployees(employees)
			.then((res) => {
				const index = employeesData.indexOf(employee);
				employeesData[index] = { ...employee, disable: !employee.disable };
				setEmployeesData([ ...employeesData ]);
				// console.log(res.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	const handleCheck = (e, emp) => {
		if (e.target.checked === true) {
			selectedEmployees.push(emp);
			return;
		}

		selectedEmployees.splice(selectedEmployees.indexOf(emp), 1);
		return;
	};

	const handleDisableDeleteList = (isDelete) => {
		if (!isDelete) {
			if (!window.confirm('Continue with group disabling?')) return;
			empInstance
				.disableEmployees(selectedEmployees)
				.then((res) => {
					for (const emp of selectedEmployees) {
						const index = employeesData.indexOf(emp);
						employeesData[index] = { ...emp, disable: !emp.disable };
						setEmployeesData([ ...employeesData ]);
					}
				})
				.catch((err) => {
					console.log(err.message);
				});
		} else {
			if (!window.confirm('Continue with group deleting?')) return;
			empInstance
				.deleteEmployees(selectedEmployees)
				.then((res) => {
					setLoading(true);
				})
				.catch((err) => {
					console.log(err.message);
				});
		}
	};

	return (
		<div className="Viewusers">
			<div className="action-btn-container">
				<button
					title="Disable Selected"
					className="btn bg-primary"
					onClick={() => {
						handleDisableDeleteList(false);
					}}
				>
					Disable All <i className="fa fa-times" />
				</button>
				<button
					title="Delete Selected"
					className="btn bg-danger"
					onClick={() => {
						handleDisableDeleteList(true);
					}}
				>
					Delete All <i className="fa fa-trash" />
				</button>
			</div>

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
						<th>Status</th>
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
									<td>{emp.name}</td>
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
									<td>{<pre>{emp.disable ? 'Disabled' : 'Active'}</pre>}</td>
									<td>
										<input
											type="checkbox"
											className="disable-btn-check"
											onChange={(e) => {
												handleCheck(e, emp);
											}}
										/>
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
						<tr>
							<td colSpan="10">No data found</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
export default ViewUsers;
