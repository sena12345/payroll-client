import React, { useState, useEffect } from 'react';
import { Modal, EditModal } from './Modal';
import { useAuth } from '../../_services/auth-context';
import Configs from '../../data-operations/data-queries/config';
import { Roles, Department, Position, Designation, Allowance, Employee } from '../../data-operations/_sahred/models';
import * as constants from '../../data-operations/_sahred/constants';
import { useAlert } from 'react-alert';
import { showConfirmAlert } from '../my-alerts';
import { MyLoader } from './my-spiner';
function FieldsConfiguration() {
	const alert = useAlert();
	const { currentUser } = useAuth();
	const queriesStore = Configs(currentUser);
	const [ show, setShow ] = useState(false);
	const [ editShow, setEditShow ] = useState(false);
	const [ title, setTitle ] = useState('');
	const [ isAllowance, setIsAllowance ] = useState(false);
	const [ roles, setRoles ] = useState([ Roles ]);
	const [ departments, setDepartments ] = useState([ Department ]);
	const [ positions, setPositions ] = useState([ Position ]);
	const [ designations, setDesignations ] = useState([ Designation ]);
	const [ allowances, setAllowances ] = useState([ Allowance ]);
	const [ cardTypes, setCardTypes ] = useState([]);
	const [ fetchData, setFetchData ] = useState(true);
	const [ seletedItem, setSeletedItem ] = useState();
	const [ selectedItemPlaceHolder, setSeletedItemPlaceHolder ] = useState({ name: '', id: '', amount: 0.0 });

	function fetchInits() {
		setFetchData(true);
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
				setFetchData(false);
			})
			.catch((err) => {
				console.log('cannot fetch allowances due to: ' + err);
				setFetchData(false);
			});
	}

	const handleDelete = (itemType, data) => {
		switch (itemType) {
			case constants.POSITIONS:
				setFetchData(true);
				queriesStore
					.deletePosition(data)
					.then((res) => {
						positions.splice(positions.indexOf(data), 1);
						setDepartments([ ...positions ]);
						alert.success('Position deleted successfully!');
						setFetchData(false);
					})
					.catch((err) => {
						console.log(err);
						alert.error(`oops error ${err.message}`);
						setFetchData(false);
					});
				break;
			case constants.DEPARTMENTS:
				setFetchData(true);
				queriesStore
					.deleteDepartment(data)
					.then((res) => {
						alert.success('Department deleted successfully!');
						departments.splice(departments.indexOf(data), 1);
						setDepartments([ ...departments ]);
						setFetchData(false);
					})
					.catch((err) => {
						alert.error(`oops error ${err.message}`);
						setFetchData(false);
					});
				break;
			case constants.ALLOWANCES:
				setFetchData(true);
				queriesStore
					.deleteAllowance(data)
					.then((res) => {
						alert.success('Allowance deleted successfully!');
						allowances.splice(allowances.indexOf(data), 1);
						setAllowances([ ...allowances ]);
						setFetchData(false);
					})
					.catch((err) => {
						alert.error(`oops error ${err.message}`);
						setFetchData(false);
					});
				break;
			case constants.DESIGNATIONS:
				setFetchData(true);
				queriesStore
					.deleteDesignation(data)
					.then((res) => {
						alert.success('Designation deleted successfully!');
						designations.splice(designations.indexOf(data), 1);
						setDesignations([ ...designations ]);
						setFetchData(false);
					})
					.catch((err) => {
						alert.error(`oops error ${err.message}`);
						setFetchData(false);
					});
				break;
			default:
				setFetchData(false);
				break;
		}
	};

	const deleteItem = (itemType, data) => {
		showConfirmAlert({
			title   : 'confirmation',
			message : `Really want to delete from ${itemType}`,
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
						handleDelete(itemType, data);
					}
				}
			]
		});
	};

	const handleSubmit = (itemType, itemName, itemAmount) => {
		if (!itemName) return;
		setShow(false);
		switch (itemType) {
			case constants.POSITIONS:
				setFetchData(true);
				queriesStore
					.createPosition({ position: itemName })
					.then((res) => {
						alert.success('Position added successfully!');
						setPositions([ ...positions, res.data ]);
						setFetchData(false);
					})
					.catch((err) => {
						alert.error(`oops error ${err.message}`);
						setFetchData(false);
					});
				break;
			case constants.DEPARTMENTS:
				setFetchData(true);
				queriesStore
					.createDepartment({ department: itemName })
					.then((res) => {
						alert.success('Department added successfully!');
						setDepartments([ ...departments, res.data ]);
						setFetchData(false);
					})
					.catch((err) => {
						alert.error(`oops error ${err.message}`);
						setFetchData(false);
					});
				break;
			case constants.ALLOWANCES:
				setFetchData(true);
				queriesStore
					.createAllowance({ allowance: itemName, amount: itemAmount ? itemAmount : 0.0 })
					.then((res) => {
						alert.success('Allowance added successfully!');
						setAllowances([ ...allowances, res.data ]);
						setFetchData(false);
					})
					.catch((err) => {
						alert.error(`oops error ${err.message}`);
						setFetchData(false);
					});
				break;
			case constants.DESIGNATIONS:
				setFetchData(true);
				queriesStore
					.createDesignation({ designation: itemName })
					.then((res) => {
						alert.success('Designation added successfully!');
						setDesignations([ ...designations, res.data ]);
						setFetchData(false);
					})
					.catch((err) => {
						alert.error(`oops error ${err.message}`);
						setFetchData(false);
					});
				break;
			default:
				setFetchData(false);
				break;
		}
	};

	const handleSubmitUpdate = (itemType, itemName, itemAmount) => {
		if (!itemName) return;
		setEditShow(false);
		setFetchData(true);
		switch (itemType) {
			case constants.POSITIONS:
				queriesStore
					.updatePosition({ position_id: seletedItem.position_id, position: itemName })
					.then((res) => {
						alert.success('Position updated successfully!');
						setFetchData(false);
					})
					.catch((err) => {
						alert.error(`oops error due to :${err.message}`);
						setFetchData(false);
					});
				break;
			case constants.DEPARTMENTS:
				queriesStore
					.updateDepartment({ department_id: seletedItem.department_id, department: itemName })
					.then((res) => {
						alert.success('Department updated successfully!');
						setFetchData(false);
					})
					.catch((err) => {
						alert.error(`oops ${err.message}`);
						setFetchData(false);
					});
				break;
			case constants.ALLOWANCES:
				queriesStore
					.updateAllowance({
						allowance_id : seletedItem.allowance_id,
						allowance    : itemName,
						amount       : itemAmount ? parseFloat(itemAmount) : 0.0
					})
					.then((res) => {
						alert.success('Allowance updated successfully!');
						setFetchData(false);
					})
					.catch((err) => {
						alert.error(`oops ${err.message}`);
						setFetchData(false);
					});
				break;
			case constants.DESIGNATIONS:
				queriesStore
					.updateDesignation({ designation_id: seletedItem.designation_id, designation: itemName })
					.then((res) => {
						alert.success('Designation updated successfully!');
						setFetchData(res.data);
					})
					.catch((err) => {
						alert.error(`oops ${err.message}`);
						setFetchData(false);
					});
				break;
			default:
				setFetchData(false);
				break;
		}
	};

	useEffect(
		() => {
			if (fetchData) fetchInits();
		},
		[ fetchData ]
	);

	return fetchData ? (
		<MyLoader />
	) : (
		<div className="fieldconfig">
			<div className="card bg-grey">
				<div className="card-head">
					<h2>
						<b>Positions</b>
					</h2>

					<button
						onClick={() => {
							setShow(true);
							setTitle(constants.POSITIONS);
							setIsAllowance(false);
						}}
						className="bg-success"
					>
						New <i className="fa fa-plus" />
					</button>
				</div>
				<Modal
					onClose={() => setShow(false)}
					show={show}
					title={title}
					showAmount={isAllowance}
					handleSubmit={handleSubmit}
				/>
				<EditModal
					onClose={() => setEditShow(false)}
					show={editShow}
					title={title}
					showAmount={isAllowance}
					handleSubmit={handleSubmitUpdate}
					data={selectedItemPlaceHolder}
				/>

				{
					<ul>
						{positions.map((pos) => {
							return (
								<div key={pos.position_id} className="container child-container">
									<p>{pos.position}</p>
									<div>
										<a
											title="edit"
											onClick={() => {
												setTitle(constants.POSITIONS);
												setIsAllowance(false);
												setSeletedItem(pos);
												setEditShow(true);
												setSeletedItemPlaceHolder({ name: pos.position, id: pos.position_id });
											}}
										>
											<i className="fa fa-pen" />
										</a>
										<a
											title="delete"
											onClick={() => {
												deleteItem(constants.POSITIONS, pos);
											}}
										>
											<i className="fa fa-trash" />
										</a>
									</div>
								</div>
							);
						})}
					</ul>
				}
			</div>

			<div className="card bg-grey">
				<div className="card-head">
					<h2>
						<b>Departments</b>
					</h2>

					<button
						onClick={() => {
							setShow(true);
							setTitle(constants.DEPARTMENTS);
							setIsAllowance(false);
						}}
						className="bg-success"
					>
						New <i className="fa fa-plus" />
					</button>
				</div>

				{
					<ul>
						{departments.map((dep) => {
							return (
								<div key={dep.department_id} className="container child-container">
									<p>{dep.department}</p>
									<div>
										<a
											title="edit"
											onClick={() => {
												setTitle(constants.DEPARTMENTS);
												setIsAllowance(false);
												setSeletedItem(dep);
												setEditShow(true);
												setSeletedItemPlaceHolder({
													name : dep.department,
													id   : dep.department_id
												});
											}}
										>
											<i className="fa fa-pen" />
										</a>
										<a
											title="delete"
											onClick={() => {
												deleteItem(constants.DEPARTMENTS, dep);
											}}
										>
											<i className="fa fa-trash" />
										</a>
									</div>
								</div>
							);
						})}
					</ul>
				}
			</div>

			<div className="card bg-grey">
				<div className="card-head">
					<h2>
						<b>Allowances</b>
					</h2>

					<button
						onClick={() => {
							setShow(true);
							setTitle(constants.ALLOWANCES);
							setIsAllowance(true);
						}}
						className="bg-success"
					>
						New <i className="fa fa-plus" />
					</button>
				</div>

				{
					<ul>
						{allowances.map((allowance) => {
							return (
								<div key={allowance.allowance_id} className="container child-container">
									<p>{allowance.allowance}</p>
									<p>Gh&#162; {allowance.amount}</p>
									<div>
										<a
											onClick={() => {
												setTitle(constants.ALLOWANCES);
												setIsAllowance(true);
												setSeletedItem(allowance);
												setEditShow(true);
												setSeletedItemPlaceHolder({
													name   : allowance.allowance,
													id     : allowance.allowance_id,
													amount : allowance.amount
												});
											}}
										>
											<i className="fa fa-pen" />
										</a>
										<a
											title="delete"
											onClick={() => {
												deleteItem(constants.ALLOWANCES, allowance);
											}}
										>
											<i className="fa fa-trash" />
										</a>
									</div>
								</div>
							);
						})}
					</ul>
				}
			</div>

			<div className="card bg-grey">
				<div className="card-head">
					<h2>
						<b>Designation</b>
					</h2>

					<button
						onClick={() => {
							setShow(true);
							setTitle(constants.DESIGNATIONS);
							setIsAllowance(false);
						}}
						className="bg-success"
					>
						New <i className="fa fa-plus" />
					</button>
				</div>

				{
					<ul>
						{designations.map((des) => {
							return (
								<div key={des.designation_id} className="container child-container">
									<p>{des.designation}</p>
									<div>
										{' '}
										<a
											onClick={() => {
												setTitle(constants.DESIGNATIONS);
												setIsAllowance(false);
												setSeletedItem(des);
												setEditShow(true);
												setSeletedItemPlaceHolder({
													name : des.designation,
													id   : des.designation_id
												});
											}}
										>
											<i className="fa fa-pen" />
										</a>
										<a
											title="delete"
											onClick={() => {
												deleteItem(constants.DESIGNATIONS, des);
											}}
										>
											<i className="fa fa-trash" />
										</a>
									</div>
								</div>
							);
						})}
					</ul>
				}
			</div>

			<div className="card bg-grey">
				<div className="card-head">
					<h2>
						<b>Role</b>
					</h2>

					<button
						onClick={() => {
							setShow(true);
							setTitle(constants.ROLES);
							setIsAllowance(false);
						}}
						className="bg-success"
					>
						New <i className="fa fa-plus" />
					</button>
				</div>
				<hr />

				{
					<ul>
						{roles.map((role) => {
							return (
								<div key={role.role_id} className="container child-container">
									<p>{role.role}</p>
									<div>
										<a title="edit" disabled className=" float-right">
											<i className="fa fa-pen" />
										</a>
										<a title="delete" disabled className=" float-right">
											<i className="fa fa-trash" />
										</a>
									</div>
								</div>
							);
						})}
					</ul>
				}
			</div>
		</div>
	);
}

export default FieldsConfiguration;
