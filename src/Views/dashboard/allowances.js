import React, { useEffect, useState } from 'react';
import AllowanceModal from './my-modals/allowance-modal';
import { useAlert } from 'react-alert';
import { useAuth } from '../../_services/auth-context';
import Config from '../../data-operations/data-queries/config';
import { showConfirmAlert } from '../my-alerts';
import { MyLoader } from './my-spiner';
export default function Allowances() {
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
			})
			.catch((err) => {
				alert.error(`oops error ${err.message}`);
			});
	};

	const handleDelete = (data) => {
		instance
			.deleteAllowance(data)
			.then((res) => {
				setLoading(true);
				alert.success('Allowance deleted successfully!');
			})
			.catch((err) => {
				alert.error(`oops error ${err.message}`);
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

	useEffect(() => {
		if (loading === true) {
			console.log('loading allowances..');
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
						<b>Allowances</b>
					</h2>

					<button
						onClick={() => {
							setIsEdit(false);
							setShow(true);
							setSelected({ flat: '' });
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
											href="#"
											onClick={() => {
												setSelected(all);
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
