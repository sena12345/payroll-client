import React, { useEffect, useState } from 'react';
import AllowanceModal from './my-modals/allowance-modal';
import { useAlert } from 'react-alert';
import { useAuth } from '../../_services/auth-context';
import Config from '../../data-operations/data-queries/config';
import { showConfirmAlert } from '../my-alerts';
import { MyLoader } from './my-spiner';
export default function Allowances() {
	const [ designations, setDesignations ] = useState([]);

	const [ allowances, setAllowances ] = useState([]);
	const [ show, setShow ] = useState(false);
	const [ isEdit, setIsEdit ] = useState(false);
	const [ loading, setLoading ] = useState(true);
	const [ selected, setSelected ] = useState();
	const { currentUser } = useAuth();
	const instance = Config(currentUser);
	const alert = useAlert();

	const init = () => {
		instance
			.getAllowances()
			.then((res) => {
				setAllowances(res.data);
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
			.deleteAllowance(data)
			.then((res) => {
				alert.success('Allowance deleted successfully!');
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
			message : `Really want to delete ${data.allowance}?`,
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
						<b>Allowances</b>
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
					<AllowanceModal show={show} onClose={() => setShow(false)} isEdit={isEdit} data={selected} />
				</div>

				{
					<ul>
						{allowances.map((all) => {
							return (
								<div key={all.allowance_id} className="container child-container">
									<p>{all.allowance}</p>
									<div className="card-btns">
										{' '}
										<a
											onClick={() => {
												setSelected(all);
												setIsEdit(true);
												setShow(true);
											}}
										>
											<i className="fa fa-pen" />
										</a>
										<a
											title="delete"
											onClick={(e) => {
												handleConfirmDelete(all);
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
