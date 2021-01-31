import React, { useEffect, useState } from 'react';
import AllowanceModal from './my-modals/allowance-modal';
import { useAlert } from 'react-alert';
import { useAuth } from '../../_services/auth-context';
import Config from '../../data-operations/data-queries/config';
import { showConfirmAlert } from '../my-alerts';
import { MyLoader } from './my-spiner';

const Allowances = () => {
	const [ allowances, setAllowances ] = useState([]);
	const [ show, setShow ] = useState(false);
	const [ isEdit, setIsEdit ] = useState(false);
	const [ loading, setLoading ] = useState(true);
	const [ selected, setSelected ] = useState();
	const { currentUser } = useAuth();
	const instance = Config(currentUser);
	const alert = useAlert();

	useEffect(
		() => {
			if (loading) {
				console.log('loading allowances..');
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
			.getAllowances()
			.then((res) => {
				setLoading(false);
				setAllowances(res.data);
			})
			.catch((err) => {
				setLoading(false);
				alert.error(`oops error ${err.message}`);
			});
	};

	const handleSubmit = (data) => {
		const departments1 = [];
		const designations1 = [];
		if (!data) return;

		if (data.department) {
			console.log('fetc..');
			data.department.forEach((dep) => {
				departments1.push({ department_id: dep });
			});
		}

		if (data.designation) {
			console.log('fetchin...');
			data.designation.forEach((des) => {
				designations1.push({ designation_id: des });
			});
		}

		// console.log(data.departmental, designations, departments);
		// return;

		const processedAllowance = {
			allowance         : data.allowance,
			amount            : data.amount,
			percentage        : parseFloat(data.percentage) ? parseFloat(data.percentage) : 0,
			frequency         : parseInt(data.frequency) ? parseInt(data.frequency) : 0,
			toAllDesignations : false,
			toAllDepartments  : false,
			departments       : parseInt(data.departmental) === 1 ? departments1 : [],
			designations      : parseInt(data.departmental) === 1 ? [] : designations1,
			departmental      : parseInt(data.departmental) === 1,
			flat              : data.flat
		};
		console.log(processedAllowance.departmental, processedAllowance.departments, processedAllowance.designations);

		if (isEdit) {
			// console.log(selected.allowance_id, data.departmental);
			const newUpdateData = { allowance_id: selected.allowance_id, ...processedAllowance };
			// console.log(newUpdateData);
			// return;
			instance
				.updateAllowance(newUpdateData)
				.then((res) => {
					setShow(false);
					setLoading(true);
					alert.success('successfully updated..');
				})
				.catch((err) => alert.error(`oop err ${err.message}`));
		} else {
			instance
				.createAllowance(processedAllowance)
				.then((res) => {
					setShow(false);
					setLoading(true);
					alert.success('succefully submited data..');
				})
				.catch((err) => {
					alert.error('oops ' + err.message);
					console.log(err);
				});
		}
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
					<AllowanceModal
						show={show}
						onClose={() => setShow(false)}
						isEdit={isEdit}
						data={selected}
						handleSubmit={handleSubmit}
					/>
				</div>

				{
					<table>
						<thead>
							<tr>
								<th>#</th>
								<th>Benefit</th>
								<th>&#162;</th>
								<th>Percentage(%)</th>
								<th>Departments</th>
								<th>Designations</th>
								<th>Frequency(Months)</th>
								<th>Date</th>
							</tr>
						</thead>

						<tbody>
							{allowances.map((all) => {
								const ind = allowances.indexOf(all);
								return (
									<tr key={all.allowance_id}>
										<td>{ind + 1}</td>
										<td>{all.allowance}</td>
										<td>{all.amount}</td>
										<td>{all.percentage}</td>
										<td>
											{
												<ol>
													{all.departments.map((dep) => {
														return <li key={dep.department_id}>{dep.department}</li>;
													})}
												</ol>
											}
										</td>
										<td>
											{
												<ol>
													{all.designations.map((des) => {
														return <li key={des.designation_id}>{des.designation}</li>;
													})}
												</ol>
											}
										</td>

										<td>{all.frequency}</td>
										<td>{all.date}</td>
										<td>
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
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				}
			</div>
		</div>
	);
};

export default Allowances;
