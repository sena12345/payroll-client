import React, { useEffect, useState } from 'react';
import EmployeeInstance from '../../data-operations/data-queries/employees';
import { showConfirmAlert } from '../my-alerts';
import { useAlert } from 'react-alert';
import { useAuth } from '../../_services/auth-context';
import { MyLoader } from './my-spiner';
function ViewUsers() {
	const { currentUser } = useAuth();
	const empInstance = EmployeeInstance(currentUser);
	const [ employeesData, setEmployeesData ] = useState([]);
	const [ selectedEmployee, setSeletecEmployee ] = useState();
	const [ load, setLoading ] = useState('true');
	const alert = useAlert();
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

	const handleConfirm = (title, message, action) => {
		showConfirmAlert({
			title   : title,
			message : message,
			buttons : [
				{
					label   : 'No',
					onClick : () => {
						console.log('cancel');
					}
				},
				{
					label   : 'Yes',
					onClick : () => action()
				}
			]
		});
	};

	const handleCheck = (e, employee) => {
		if (e.target.checked === true) {
			selectedEmployees.push(employee);
			return;
		}

		selectedEmployees.splice(selectedEmployees.indexOf(employee), 1);
		return;
	};

	const handleMultiDisable = () => {
		setLoading(true);
		empInstance
			.disableEmployees(selectedEmployees)
			.then((res) => {
				alert.success('successfully change state of employees!');
				for (const emp of selectedEmployees) {
					const index = employeesData.indexOf(emp);
					employeesData[index] = { ...emp, disable: !emp.disable };
					setEmployeesData([ ...employeesData ]);
				}
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				alert.error(`oops! error due to ${err.message}`);
			});
	};

	const handleMultiDelete = () => {
		setLoading(true);
		empInstance
			.deleteEmployees(selectedEmployees)
			.then((res) => {
				alert.success('successfully deleted employees!');
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				alert.error(`oops! error due to ${err.message}`);
			});
	};

	const handleSingleDisable = () => {
		setLoading(true);
		empInstance
			.disableEmployees([ selectedEmployee ])
			.then((res) => {
				alert.success('successfully change state employees!');
				const index = employeesData.indexOf(selectedEmployee);
				employeesData[index] = { ...selectedEmployee, disable: !selectedEmployee.disable };
				setEmployeesData([ ...employeesData ]);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				alert.error(`oops! error due to ${err.message}`);
			});
	};

	const handleSingleDelete = () => {
		setLoading(true);
		empInstance
			.deleteEmployees([ selectedEmployee ])
			.then((res) => {
				alert.success('successfully deleted employees!');
				setLoading(false);
			})
			.catch((err) => {
				alert.error(`oops! error due to ${err.message}`);
				setLoading(false);
			});
	};

	const handleMultiDisableAndDeleteList = (isDelete) => {
		if (!isDelete) {
			handleConfirm(
				'Confirm',
				`Continue to change status of ${selectedEmployees.length} employees?`,
				handleMultiDisable
			);
		} else {
			handleConfirm(
				'Warning',
				`You are about to permanently delete ${selectedEmployees.length} employees?`,
				handleMultiDelete
			);
		}
	};

	const handleSingleDeleteAndDisable = (isDelete, employee) => {
		if (!isDelete) {
			handleConfirm('Confirm', `Continue to changes status of ${employee.name}?`, handleSingleDisable);
		} else {
			handleConfirm('Warning', `You are about to permanently delete ${employee.name}?`, handleSingleDelete);
		}
	};

	return load ? (
		<MyLoader />
	) : (
		<div className="Viewusers">
			<div className="action-btn-container">
				<a
					title="enable or disable Selected"
					className="btn bg-transparent"
					onClick={() => {
						if (selectedEmployees.length < 1) {
							alert.info('kindly select employees to disable!');
							return;
						}
						handleMultiDisableAndDeleteList(false);
					}}
				>
					Change state <i className="fa fa-times " />
				</a>
				<a
					title="Delete Selected"
					className="btn bg-transparent"
					onClick={() => {
						if (selectedEmployees.length < 1) {
							alert.info('kindly select employees to delete!');
							return;
						}
						handleMultiDisableAndDeleteList(true);
					}}
				>
					Delete selected <i className="fa fa-trash" />
				</a>
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
						<th>Select</th>
						<th>Actions</th>
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
										<a title="View Details">
											<i className="fa fa-eye" />
										</a>
										<a title="Edit Details">
											<i className="fa fa-pen" />
										</a>
										<a
											title="Disable Employee"
											onClick={() => {
												setSeletecEmployee(emp);
												handleSingleDeleteAndDisable(false, emp);
											}}
										>
											<i className="fa fa-times" />
										</a>
										<a
											title="Delete Employee"
											onClick={() => {
												setSeletecEmployee(emp);
												handleSingleDeleteAndDisable(true, emp);
											}}
										>
											<i className="fa fa-trash" />
										</a>
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
