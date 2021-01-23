import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import { useAuth } from '../../_services/auth-context';
import Configs from '../../data-operations/data-queries/config';
import { Roles, Department, Position, Designation, Allowance, Employee } from '../../data-operations/_sahred/models';
import * as constants from '../../data-operations/_sahred/constants';

function FieldsConfiguration() {
	const { currentUser } = useAuth();
	const queriesStore = Configs(currentUser);
	const [ show, setShow ] = useState(false);
	const [ title, setTitle ] = useState('');
	const [ isAllowance, setIsAllowance ] = useState(false);
	const [ isUpdate, setIsUpdate ] = useState(false);
	const [ updateData, setUpdateData ] = useState();
	const [ roles, setRoles ] = useState([ Roles ]);
	const [ departments, setDepartments ] = useState([ Department ]);
	const [ positions, setPositions ] = useState([ Position ]);
	const [ designations, setDesignations ] = useState([ Designation ]);
	const [ allowances, setAllowances ] = useState([ Allowance ]);
	const [ cardTypes, setCardTypes ] = useState([]);
	const [ fetchData, setFetchData ] = useState(true);

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

	const deleteItem = (itemType, data) => {
		if (!window.confirm(`Really want to remove ${itemType}`)) return;

		console.log('value to delete: ', data);

		switch (itemType) {
			case constants.POSITIONS:
				queriesStore
					.deletePosition(data)
					.then((res) => {
						positions.splice(positions.indexOf(data), 1);
						setDepartments([ ...positions ]);
					})
					.catch((err) => {
						console.log(err);
						setFetchData(false);
					});
				break;
			case constants.DEPARTMENTS:
				queriesStore
					.deleteDepartment(data)
					.then((res) => {
						departments.splice(departments.indexOf(data), 1);
						setDepartments([ ...departments ]);
					})
					.catch((err) => {
						console.log(err);
						setFetchData(false);
					});
				break;
			case constants.ALLOWANCES:
				queriesStore
					.deleteAllowance(data)
					.then((res) => {
						allowances.splice(allowances.indexOf(data), 1);
						setAllowances([ ...allowances ]);
					})
					.catch((err) => {
						console.log(err);
						setFetchData(false);
					});
				break;
			case constants.DESIGNATIONS:
				queriesStore
					.deleteDesignation(data)
					.then((res) => {
						designations.splice(designations.indexOf(data), 1);
						setDesignations([ ...designations ]);
					})
					.catch((err) => {
						console.log(err);
						setFetchData(false);
					});
				break;
			default:
				setFetchData(false);
				break;
		}
	};

	const handleSubmit = (itemType, itemName, itemAmount) => {
		if (!itemName) return;
		setShow(false);
		switch (itemType) {
			case constants.POSITIONS:
				queriesStore
					.createPosition({ position: itemName })
					.then((res) => {
						setPositions([ ...positions, res.data ]);
					})
					.catch((err) => {
						console.log(err);
						setFetchData(false);
					});
				break;
			case constants.DEPARTMENTS:
				queriesStore
					.createDepartment({ department: itemName })
					.then((res) => {
						setDepartments([ ...departments, res.data ]);
					})
					.catch((err) => {
						console.log(err);
						setFetchData(false);
					});
				break;
			case constants.ALLOWANCES:
				queriesStore
					.createAllowance({ allowance: itemName, amount: itemAmount ? itemAmount : 0.0 })
					.then((res) => {
						setAllowances([ ...allowances, res.data ]);
					})
					.catch((err) => {
						console.log(err);
						setFetchData(false);
					});
				break;
			case constants.DESIGNATIONS:
				queriesStore
					.createDesignation({ designation: itemName })
					.then((res) => {
						setDesignations([ ...designations, res.data ]);
					})
					.catch((err) => {
						console.log(err);
						setFetchData(false);
					});
				break;
			default:
				setFetchData(false);
				break;
		}
	};

	const handleSubmitUpdate = (itemType, editData, itemName, itemAmount) => {
		if (!itemName) return;

		switch (itemType) {
			case constants.POSITIONS:
				queriesStore
					.updatePosition({ position_id: editData.position_id, position: itemName })
					.then((res) => {
						setFetchData(res.data);
					})
					.catch((err) => {
						console.log(err);
						setFetchData(false);
					});
				break;
			case constants.DEPARTMENTS:
				queriesStore
					.updateDepartment({ department_id: editData.department_id, department: itemName })
					.then((res) => {
						setFetchData(res.data);
					})
					.catch((err) => {
						console.log(err);
						setFetchData(false);
					});
				break;
			case constants.ALLOWANCES:
				queriesStore
					.updateAllowance({
						allowance_id : editData.allowance_id,
						allowance    : itemName,
						amount       : itemAmount ? itemAmount : 0.0
					})
					.then((res) => {
						setFetchData(res.data);
					})
					.catch((err) => {
						console.log(err);
						setFetchData(false);
					});
				break;
			case constants.DESIGNATIONS:
				queriesStore
					.updateDesignation({ designation_id: editData.designation_id, designation: itemName })
					.then((res) => {
						setFetchData(res.data);
					})
					.catch((err) => {
						console.log(err);
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

	return (
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
					handleSubmit={isUpdate ? handleSubmitUpdate : handleSubmit}
					isUpdate={isUpdate}
					editData={updateData}
				/>

				{
					<ul>
						{positions.map((pos) => {
							return (
								<div key={pos.position_id} className="container child-container">
									<p>{pos.position}</p>
									<div>
										<button title="edit" className=" float-right-btn">
											<i className="fa fa-pen" />
										</button>
										<button
											title="delete"
											className=" float-right-btn"
											onClick={() => {
												deleteItem(constants.POSITIONS, pos);
											}}
										>
											<i className="fa fa-trash" />
										</button>
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
										<button title="edit" className=" float-right">
											<i className="fa fa-pen" />
										</button>
										<button
											title="delete"
											className="float-right"
											onClick={() => {
												deleteItem(constants.DEPARTMENTS, dep);
											}}
										>
											<i className="fa fa-trash" />
										</button>
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
										<button>
											<i className="fa fa-pen" />
										</button>
										<button
											title="delete"
											className=" float-right"
											onClick={() => {
												deleteItem(constants.ALLOWANCES, allowance);
											}}
										>
											<i className="fa fa-trash" />
										</button>
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
										<button>
											<i className="fa fa-pen" />
										</button>
										<button
											title="delete"
											className=" float-right"
											onClick={() => {
												deleteItem(constants.DESIGNATIONS, des);
											}}
										>
											<i className="fa fa-trash" />
										</button>
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
										<button title="edit" disabled className=" float-right">
											<i className="fa fa-pen" />
										</button>
										<button title="delete" disabled className=" float-right">
											<i className="fa fa-trash" />
										</button>
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
