import React, { useEffect, useState } from 'react';
import DesignationModal from './my-modals/designation-modal';
import { useAlert } from 'react-alert';
import { useAuth } from '../../_services/auth-context';
import Config from '../../data-operations/data-queries/config';
import { showConfirmAlert } from '../my-alerts';
import { MyLoader } from './my-spiner';
export default function Designations() {
	const [ designations, setDesignations ] = useState([]);
	const [ show, setShow ] = useState(false);
	const [ isEdit, setIsEdit ] = useState(false);
	const [ loading, setLoading ] = useState(true);
	const [ selected, setSelected ] = useState();
	const { currentUser } = useAuth();
	const instance = Config(currentUser);
	const alert = useAlert();

	const init = () => {
		instance
			.getAllDesignation()
			.then((res) => {
				setDesignations(res.data);
			})
			.catch((err) => {
				alert.error(`oops error ${err.message}`);
			});
	};

	const handleSubmit = (data) => {
		let departmentData = [];
		if (isEdit) {
			departmentData.push(...selected.departments);
			data.department.forEach((dep) => {
				departmentData.push({ department_id: parseInt(dep) });
			});
			if (departmentData.length < 1) {
				alert.error('Kindly select department!');
				return;
			}
			instance
				.updateDesignation({
					designation_id : selected.designation_id,
					designation    : data.designation,
					departments    : departmentData
				})
				.then((res) => {
					setLoading(true);
					setShow(false);
					alert.success('successfully updated..');
				})
				.catch((err) => alert.error(`oop err ${err.message}`));
		} else {
			data.department.forEach((dep) => {
				departmentData.push({ department_id: parseInt(dep) });
			});
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
		setLoading(true);
		instance
			.deleteDesignation(data)
			.then((res) => {
				alert.success('Designation deleted successfully!');
				setLoading(false);
			})
			.catch((err) => {
				alert.error(`oops error ${err.message}`);
				setLoading(false);
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

	useEffect(() => {
		if (loading === true) {
			console.log('loading designations..');
			init();
		}
		return () => {
			setLoading(false);
		};
	});

	return loading ? (
		<MyLoader />
	) : (
		<div className="fieldconfig">
			<div className="card bg-grey">
				<div className="card-head">
					<h2>
						<b>Designation</b>
					</h2>

					<h2>
						<b>Department</b>
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
}
