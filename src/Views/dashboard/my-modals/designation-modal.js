import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../_services/auth-context';
import Config from '../../../data-operations/data-queries/config';
import { Department } from '../../../data-operations/_sahred/models';
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';
import MultiSelect from 'react-multi-select-component';
import { ConvertedDepartment } from '../../../data-operations/data-queries/converter';
export default function DesignationModal(props) {
	const { currentUser } = useAuth();
	const instance = Config(currentUser);
	const alert = useAlert();
	const [ selectedDepartments, setSelectedDepartments ] = useState([]);
	const [ departments, setDepartments ] = useState([ Department ]);
	const { register, handleSubmit, reset } = useForm();
	// const selectedDepartments = props.isEdit ? props.data.departments : [];
	// const defaultValue = [];
	// selectedDepartments.forEach((d) => {
	// 	defaultValue.push(d.department_id);
	// });

	const init = () => {
		setSelectedDepartments(props.isEdit ? ConvertedDepartment(props.data.departments) : []);

		instance
			.getDepartments()
			.then((res) => {
				setDepartments(ConvertedDepartment(res.data));
			})
			.catch((err) => alert.error('oops ' + err.message));
	};

	useEffect(
		() => {
			init();
			return () => {};
		},
		[ props.isEdit ]
	);

	const onSubmit = (data) => {
		if (!data) return;
		if (!data.designation) return;

		props.handleSubmit(selectedDepartments, data);
	};

	return props.show ? (
		<div className="modal" onClick={props.onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="modal-content" onClick={(e) => e.stopPropagation()}>
					<div className="modal-head">
						<h4>Designation</h4>
					</div>
					<div className="modal-body container">
						<div>
							<label htmlFor="designation">
								{props.isEdit ? `Edit ${props.data.designation}` : 'New Designation'}
							</label>
							<input
								defaultValue={props.isEdit ? props.data.designation : ''}
								ref={register({ required: true })}
								id="designation"
								name="designation"
								className="modal-field-value"
								type="text"
								placeholder="Item name"
							/>
						</div>

						<div>
							<label htmlFor="department">Department</label>
							<MultiSelect
								name="designation"
								options={departments}
								value={selectedDepartments}
								onChange={setSelectedDepartments}
								labelledBy={'Select'}
							/>
							{
								// 							<select
								// 								ref={register}
								// 								name="department"
								// 								id="department"
								// 								multiple
								// 								defaultValue={defaultValue}
								// 							>
								// 								<option key={-1} disabled>
								// 									choose...
								// 								</option>
								// 								{departments.map((dep) => {
								// 									return (
								// 										<option key={dep.department_id} value={dep.department_id}>
								// 											{dep.department}
								// 										</option>
								// 									);
								// 								})}
								//						</select>
							}
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
