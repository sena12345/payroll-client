import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../_services/auth-context';
import Config from '../../../data-operations/data-queries/config';
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';

export default function AllowanceModal(props) {
	const { currentUser } = useAuth();
	const instance = Config(currentUser);
	const alert = useAlert();
	const [ isFlat, setIsFlat ] = useState(true);
	const [ departments, setDepartments ] = useState([]);
	const [ designations, setDesignations ] = useState([]);
	const [ sortedDesignations, setSortedDesignations ] = useState([]);
	const { register, handleSubmit, reset } = useForm();
	const freqs = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];

	useEffect(
		() => {
			instance
				.getDepartments()
				.then((res) => {
					setDepartments(res.data);
				})
				.catch((err) => alert.error('oops ' + err.message));

			instance
				.getAllDesignation()
				.then((res) => {
					setDesignations(res.data);
				})
				.catch((err) => {
					alert.error('oops! ' + err.message);
				});
		},
		[ props.isEdit ]
	);

	const handleSetDesignation = (val) => {
		const sortData = [];
		designations.forEach((des) => {
			des.departments.forEach((dep) => {
				if (dep.department_id === val.target.value) {
					sortData.push(des);
				}
			});
		});
		setSortedDesignations(sortData);
	};

	const onSubmit = (data) => {
		if (!data) return;
		//allowance_id      : '',
		const processedAllowance = {
			allowance         : data.allowance,
			amount            : data.amount,
			percentage        : parseFloat(data.percentage) ? parseFloat(data.percentage) : 0,
			frequency         : parseInt(data.frequency) ? parseInt(data.frequency) : 0,
			toAllDesignations : parseInt(data.designation) == -1 ? true : false,
			toAllDepartments  : parseInt(data.department) == -1 ? true : false,
			departments       : parseInt(data.department) == -1 ? departments : [ { department_id: data.department } ],
			designations      :
				parseInt(data.designation) == -1 ? designations : [ { designation_id: data.designation } ],
			departmental      : parseInt(data.department) == -1,
			flat              : isFlat
		};
		console.log(processedAllowance);

		if (props.isEdit) {
			instance
				.updateAllowance({ ...processedAllowance, allowance_id: props.data.allowance_id })
				.then((res) => {
					alert.success('successfully updated..');
					props.onClose();
				})
				.catch((err) => alert.error(`oop err ${err.message}`));
		} else {
			instance
				.createAllowance(processedAllowance)
				.then((res) => {
					alert.success('succefully submited data..');
					props.onClose();
				})
				.catch((err) => {
					alert.error('oops ' + err.message);
					console.log(err);
				});
		}
	};

	return props.show ? (
		<div className="modal" onClick={props.onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="modal-content" onClick={(e) => e.stopPropagation()}>
					<div className="modal-head">
						<h4>{`Allowances`}</h4>
					</div>
					<div className="modal-body container">
						<div>
							<label htmlFor="allowance">Allowance</label>
							<input
								defaultValue={props.isEdit ? props.data.allowance : ''}
								ref={register({ required: true })}
								id="allowance"
								name="allowance"
								className="modal-field-value"
								type="text"
								placeholder="Item name"
								required
							/>
						</div>

						<div>
							<label htmlFor="amount">Amount</label>
							<input
								required
								defaultValue={props && props.isEdit ? props.data.amount : 0}
								ref={register({ required: true })}
								id="amount"
								name="amount"
								className="modal-field-value"
								type="text"
								placeholder="Item name"
							/>
						</div>

						<div className="radio-container">
							<label htmlFor="flat">
								<input
									required
									type="radio"
									id="flat"
									defaultChecked={props && props.isEdit ? props.data.flat ? true : false : true}
									name="flat"
									value={isFlat}
									ref={register({ required: true })}
									onChange={(e) => setIsFlat(true)}
								/>
								Flat
							</label>

							<label htmlFor="calculated">
								<input
									required
									type="radio"
									id="calculated"
									defaultChecked={props && props.isEdit ? props.data.flat ? false : true : false}
									name="flat"
									value={isFlat}
									ref={register({ required: true })}
									onChange={(e) => setIsFlat(false)}
								/>
								Calculated
							</label>
						</div>

						<div>
							<label htmlFor="percentage">Percentage(%)</label>
							<input
								required
								defaultValue={props.data && props.isEdit ? props.data.percentage : 0}
								readOnly={
									!props && !props.data.isEdit ? isFlat ? (
										true
									) : (
										false
									) : props && props.data.flat ? (
										true
									) : (
										false
									)
								}
								ref={register()}
								id="percentage"
								name="percentage"
								className="modal-field-value"
								type="text"
								placeholder="example: 0.2"
							/>
						</div>

						<div>
							<label htmlFor="department">Departments</label>
							<select
								required
								defaultValue={props && props.isEdit ? props.data.department_id : ''}
								ref={register({ required: true })}
								name="department"
								id="department"
								onChange={(val) => {
									handleSetDesignation(val);
								}}
							>
								<option key={-1} value={-1}>
									All
								</option>

								{departments.map((dep) => {
									return (
										<option key={dep.department_id} value={dep.department_id}>
											{dep.department}
										</option>
									);
								})}
							</select>
							<label htmlFor="designation">Designations</label>
							<select
								required
								defaultValue={props && props.isEdit ? props.data.department_id : ''}
								ref={register}
								name="designation"
								id="designation"
							>
								<option key={-1} value={-1}>
									All
								</option>

								{sortedDesignations.map((des) => {
									return (
										<option key={des.designation_id} value={des.designation_id}>
											{des.designation}
										</option>
									);
								})}
							</select>
						</div>

						<div>
							<label htmlFor="frequency">Frequency(Monthly)</label>
							<input
								defaultValue={props && props.isEdit ? props.data.frequency : '0.0'}
								required
								className="modal-field-value"
								list="dl"
								id="frequency"
								name="frequency"
								type="text"
								ref={register({ required: true })}
							/>
							<datalist id="dl">
								{freqs.map((i) => {
									return (
										<option key={i} value={i}>
											{i}
										</option>
									);
								})}
							</datalist>
						</div>
					</div>
					<div className="modal-footer">
						<button
							type="reset"
							className="modal-btn"
							onClick={() => {
								props.onClose();
								reset();
							}}
						>
							Close
						</button>
						<button type="submit" className="modal-btn">
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>
	) : null;
}
