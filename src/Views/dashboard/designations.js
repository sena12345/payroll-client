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
				setLoading(false);
			})
			.catch((err) => {
				alert.error(`oops error ${err.message}`);
				setLoading(false);
			});
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
					<DesignationModal show={show} onClose={() => setShow(false)} isEdit={isEdit} data={selected} />
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
											onClick={() => {
												setSelected(des);
												setIsEdit(true);
												setShow(true);
											}}
										>
											<i className="fa fa-pen" />
										</a>
										<a
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
