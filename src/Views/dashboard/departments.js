import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useAuth } from '../../_services/auth-context';
import Config from '../../data-operations/data-queries/config';
import { showConfirmAlert } from '../my-alerts';
import { MyLoader } from './my-spiner';
import DepartmentModal from './my-modals/department-modal';
const Departments = () => {
	const [ departments, setDepartments ] = useState([]);
	const [ show, setShow ] = useState(false);
	const [ isEdit, setEdit ] = useState(false);
	const [ loading, setLoading ] = useState(true);
	const [ selected, setSelected ] = useState();
	const { currentUser } = useAuth();
	const instance = Config(currentUser);
	const alert = useAlert();

	const init = () => {
		instance
			.getDepartments()
			.then((res) => {
				setLoading(false);
				setDepartments(res.data);
			})
			.catch((err) => {
				setLoading(false);
				alert.error(`oops error ${err.message}`);
			});
	};

	const handleSubmit = (data) => {
		if (isEdit) {
			instance
				.updateDepartment({
					department_id : selected.department_id,
					department    : data.department
				})
				.then((res) => {
					setShow(false);
					setLoading(true);
					alert.success('successfully updated..');
				})
				.catch((err) => alert.error(`oop err ${err.message}`));
		} else {
			instance
				.createDepartment({ department: data.department })
				.then((res) => {
					setShow(false);
					setLoading(true);
					alert.success('succefully submited data..');
				})
				.catch((err) => alert.error('oops ' + err.message));
		}
	};

	const handleDelete = (data) => {
		instance
			.deleteDepartment(data)
			.then((res) => {
				setLoading(true);
				alert.success('Department deleted successfully!');
			})
			.catch((err) => {
				alert.error(`oops error ${err.message}`);
			});
	};

	const handleConfirmDelete = (data) => {
		showConfirmAlert({
			title   : 'confirmation',
			message : `Really want to delete ${data.department}?`,
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

	useEffect(
		() => {
			if (loading) {
				console.log('loading departments..');
				init();
			}
			return () => {
				setLoading(false);
			};
		},
		[ loading ]
	);

	return loading ? (
		<MyLoader />
	) : (
		<div className="fieldconfig">
			<div className="card bg-grey">
				<div className="card-head">
					<h2>
						<b>Department</b>
					</h2>

					<button
						onClick={() => {
							setEdit(false);
							setShow(true);
						}}
						className="bg-success"
					>
						New <i className="fa fa-plus" />
					</button>
					<DepartmentModal
						show={show}
						onClose={() => setShow(false)}
						isEdit={isEdit}
						data={selected}
						handleSubmit={handleSubmit}
					/>
				</div>

				{
					<ul>
						{departments.map((dep) => {
							return (
								<div key={dep.department_id} className="container child-container">
									<p>{dep.department}</p>
									<div className="card-btns">
										{' '}
										<a
											href="#"
											onClick={() => {
												setSelected(dep);
												setEdit(true);
												setShow(true);
											}}
										>
											<i className="fa fa-pen" />
										</a>
										<a
											href="#"
											title="delete"
											onClick={(e) => {
												handleConfirmDelete(dep);
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

export default Departments;
