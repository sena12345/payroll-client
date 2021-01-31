import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../_services/auth-context';
import Config from '../../../data-operations/data-queries/config';
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';

const AllowanceModal = (props) => {
	const { currentUser } = useAuth();
	const instance = Config(currentUser);
	const alert = useAlert();
	const [ isFlat, setIsFlat ] = useState(props.isEdit ? (props.data.flat ? true : false) : true);
	const [ loading, setLoading ] = useState(true);
	const [ departments, setDepartments ] = useState([]);
	const [ designations, setDesignations ] = useState([]);
	const [ departmental, setDepartmental ] = useState(props.isEdit ? (props.data.departmental ? true : false) : true);
	const { register, handleSubmit, reset } = useForm();
	const freqs = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
	const selectedDepartments = props.isEdit ? props.data.departments : [];
	const selectedDesignations = props.isEdit ? props.data.designations : [];
	const defaultValueDepartments = [];
	selectedDepartments.forEach((d) => {
		defaultValueDepartments.push(d.department_id);
	});
	const defaultValueDesignations = [];
	selectedDesignations.forEach((d) => {
		defaultValueDesignations.push(d.designation_id);
	});

	useEffect(
		() => {
			if (loading) {
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
			}
			return () => {
				setLoading(false);
			};
		},
		[ loading ]
	);

	// const handleSetDesignation = (val) => {
	// 	const sortData = [];
	// 	designations.forEach((des) => {
	// 		des.departments.forEach((dep) => {
	// 			if (dep.department_id === val.target.value) {
	// 				sortData.push(des);
	// 			}
	// 		});
	// 	});
	// };

	// const onSubmit = (data) => {

	// };

	return props.show ? (
		<div className="modal" onClick={props.onClose}>
			<form onSubmit={handleSubmit(props.handleSubmit)}>
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
									onChange={(e) => {
										if (e.target.checked) setIsFlat(true);
									}}
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
									onChange={(e) => {
										if (e.target.checked) setIsFlat(false);
									}}
								/>
								Percentage
							</label>

							<label htmlFor="departmental1">
								<input
									type="radio"
									id="departmental1"
									name="departmental"
									value={1}
									defaultChecked={
										props && props.isEdit ? props.data.departmental ? true : false : true
									}
									ref={register({ required: true })}
									onChange={(e) => {
										if (e.target.checked) setDepartmental(true);
									}}
								/>
								Departmental
							</label>

							<label htmlFor="designational">
								<input
									type="radio"
									id="designational"
									defaultChecked={
										props && props.isEdit ? props.data.departmental ? false : true : false
									}
									name="departmental"
									value={0}
									ref={register({ required: true })}
									onChange={(e) => {
										if (e.target.checked) setDepartmental(false);
									}}
								/>
								Designation
							</label>
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

						{isFlat ? (
							<div />
						) : (
							<div>
								<label htmlFor="percentage">Percentage(%)</label>
								<input
									defaultValue={props.data && props.isEdit ? props.data.percentage : 0}
									ref={register()}
									id="percentage"
									name="percentage"
									className="modal-field-value"
									type="text"
									placeholder="example: 0.2"
								/>
							</div>
						)}

						<div className="form-row">
							<div className="col-50">
								<label htmlFor="department">Departments</label>

								<select
									multiple={true}
									id="department"
									defaultValue={defaultValueDepartments}
									name="department"
									ref={register}
								>
									{departments.map((dep) => {
										return (
											<option key={'k' + dep.department_id} value={dep.department_id}>
												{dep.department}
											</option>
										);
									})}
								</select>
							</div>

							<div className="col-50">
								<label htmlFor="designation">Designations</label>
								<select
									defaultValue={defaultValueDesignations}
									ref={register}
									name="designation"
									id="designation"
									multiple
								>
									{designations.map((des) => {
										return (
											<option key={des.designation_id} value={des.designation_id}>
												{des.designation}
											</option>
										);
									})}
								</select>
							</div>
						</div>

						<div>
							<label htmlFor="frequency">Frequency(Monthly)</label>
							<input
								defaultValue={props && props.isEdit ? props.data.frequency : 1}
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
								reset();
								props.onClose();
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
};

export default AllowanceModal;
