import React, { useEffect, useState } from 'react';
import DesignationModal from './my-modals/designation-modal';
import { useAlert } from 'react-alert';
import { useAuth } from '../../_services/auth-context';
import Config from '../../data-operations/data-queries/config';
import { showConfirmAlert } from '../my-alerts';
import { MyLoader } from './my-spiner';
import DepartmentModal from './my-modals/department-modal';
export default function Departments() {
	const [ departments, setDepartments ] = useState([]);
	const [ show, setShow ] = useState(false);
	const [ isEdit, setIsEdit ] = useState(false);
	const [ loading, setLoading ] = useState(true);
	const [ selected, setSelected ] = useState();
	const { currentUser } = useAuth();
	const instance = Config(currentUser);
	const alert = useAlert();

	const init = () => {
		instance
			.getDepartments()
			.then((res) => {
				setDepartments(res.data);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				alert.error(`oops error ${err.message}`);
			});
	};

	const handleDelete = (data) => {
		setLoading(true);
		instance
			.deleteDepartment(data)
			.then((res) => {
				alert.success('Department deleted successfully!');
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
			init();
		},
		[ loading, show ]
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
							setIsEdit(false);
							setShow(true);
						}}
						className="bg-success"
					>
						New <i className="fa fa-plus" />
					</button>
					<DepartmentModal show={show} onClose={() => setShow(false)} isEdit={isEdit} data={selected} />
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
											onClick={() => {
												setSelected(dep);
												setIsEdit(true);
												setShow(true);
											}}
										>
											<i className="fa fa-pen" />
										</a>
										<a
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
}
