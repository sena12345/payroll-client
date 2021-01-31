import React, { useEffect, useState } from 'react';
import DesignationModal from './my-modals/designation-modal';
import { useAlert } from 'react-alert';
import { useAuth } from '../../_services/auth-context';
import Config from '../../data-operations/data-queries/config';
import { showConfirmAlert } from '../my-alerts';
import { MyLoader } from './my-spiner';
const Designations = () => {
	const [ designations, setDesignations ] = useState([]);
	const [ show, setShow ] = useState(false);
	const [ isEdit, setIsEdit ] = useState(false);
	const [ loading, setLoading ] = useState(true);
	const [ selected, setSelected ] = useState();
	const { currentUser } = useAuth();
	const instance = Config(currentUser);
	const alert = useAlert();

	useEffect(
		() => {
			if (loading === true) {
				console.log('loading designations..');
				init();
			}
			return () => {
				setLoading(false);
			};
		},
		[ loading ]
	);

	const init = () => {
		instance
			.getAllDesignation()
			.then((res) => {
				setLoading(false);
				setDesignations(res.data);
			})
			.catch((err) => {
				setLoading(false);
				alert.error(`oops error ${err.message}`);
			});
	};

	const handleSubmit = (data) => {
		let departmentData = [];
		if (isEdit) {
			data.department.forEach((dep) => {
				departmentData.push({ department_id: parseInt(dep) });
			});
			if (departmentData.length < 1) {
				alert.error('Kindly select department!');
				return;
			}
			setLoading(false);
			instance
				.updateDesignation({
					designation_id : selected.designation_id,
					designation    : data.designation,
					departments    : departmentData
				})
				.then((res) => {
					setShow(false);
					setLoading(true);
					alert.success('successfully updated..');
				})
				.catch((err) => alert.error(`oop err ${err.message}`));
		} else {
			data.department.forEach((dep) => {
				departmentData.push({ department_id: parseInt(dep) });
			});
			if (departmentData.length < 1) {
				alert.error('Kindly select department!');
				return;
			}
			setLoading(false);
			instance
				.createDesignation({
					designation : data.designation,
					departments : departmentData
				})
				.then((res) => {
					setShow(false);
					setLoading(true);
					alert.success('succefully submited data..');
				})
				.catch((err) => alert.error('oops ' + err.message));
		}
	};

	const handleDelete = (data) => {
		setLoading(false);
		instance
			.deleteDesignation(data)
			.then((res) => {
				setLoading(true);
				alert.success('Designation deleted successfully!');
			})
			.catch((err) => {
				setLoading(false);
				alert.error(`oops error ${err.message}`);
			});
	};

	const handleConfirmDelete = (data) => {
		showConfirmAlert({
			title   : 'confirmation',
			message : `Really want to delete ${data.designation}?`,
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
						handleDelete(data);
					}
				}
			]
		});
	};

	return loading ? (
		<MyLoader />
	) : (
		<div className="fieldconfig">
			<div className="card bg-grey">
				<div className="card-head">
					<h2>
						<b>Designations</b>
					</h2>

					<h2>
						<b>Departments</b>
					</h2>

					<button
						onClick={() => {
							setIsEdit(false);
							setShow(true);
						}}
						className="bg-success"
					>
						New <i className="fa fa-plus" />
					</button>
					<DesignationModal
						show={show}
						onClose={() => setShow(false)}
						isEdit={isEdit}
						data={selected}
						handleSubmit={handleSubmit}
					/>
				</div>

				{
					<ul>
						{designations.map((des) => {
							return (
								<div key={des.designation_id} className="container child-container">
									<p>{des.designation}</p>
									<ol>
										{des.departments.map((dep) => {
											return <p key={dep.department_id}>{dep.department}</p>;
										})}
									</ol>
									<div className="card-btns">
										{' '}
										<a
											href="#"
											onClick={() => {
												setSelected(des);
												setIsEdit(true);
												setShow(true);
											}}
										>
											<i className="fa fa-pen" />
										</a>
										<a
											href="#"
											title="delete"
											onClick={(e) => {
												handleConfirmDelete(des);
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
		</div>
	);
};

export default Designations;
