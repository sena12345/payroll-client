import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../_services/auth-context';
import Config from '../../../data-operations/data-queries/config';
import { Department } from '../../../data-operations/_sahred/models';
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';

export default function DesignationModal(props) {
	const { currentUser } = useAuth();
	const instance = Config(currentUser);
	const alert = useAlert();
	const [ departments, setDepartments ] = useState([ Department ]);
	const { register, handleSubmit, errors, reset } = useForm();

	useEffect(
		() => {
			instance
				.getDepartments()
				.then((res) => {
					setDepartments(res.data);
				})
				.catch((err) => alert.error('oops ' + err.message));
		},
		[ props.isEdit ]
	);

	const onSubmit = (data) => {
		if (!data) return;
		if (!data.designation) return;
		if (props.isEdit) {
			instance
				.updateDesignation({
					designation_id : props.data.designation_id,
					designation    : data.designation,
					departments    : [ { department_id: data.department } ]
				})
				.then((res) => {
					alert.success('successfully updated..');
					props.onClose();
				})
				.catch((err) => alert.error(`oop err ${err.message}`));
		} else {
			instance
				.createDesignation({
					designation : data.designation,
					departments : [ { department_id: data.department } ]
				})
				.then((res) => {
					alert.success('succefully submited data..');
					props.onClose();
				})
				.catch((err) => alert.error('oops ' + err.message));
		}
	};

	return props.show ? (
		<div className="modal" onClick={props.onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="modal-content" onClick={(e) => e.stopPropagation()}>
					<div className="modal-head">
						<h4>{`Designation`}</h4>
					</div>
					<div className="modal-body container">
						<div>
							<label htmlFor="designation">Designation</label>
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
							<select
								defaultValue={props.isEdit ? props.data.department_id : ''}
								ref={register({ required: true })}
								name="department"
								id="department"
							>
								<option key={-1} disabled>
									choose...
								</option>

								{departments.map((dep) => {
									return (
										<option key={dep.department_id} value={dep.department_id}>
											{dep.department}
										</option>
									);
								})}
							</select>
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
