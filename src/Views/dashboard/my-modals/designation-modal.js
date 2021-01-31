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
	const { register, handleSubmit, reset } = useForm();
	const selectedDepartments = props.isEdit ? props.data.departments : [];

	useEffect(
		() => {
			instance
				.getDepartments()
				.then((res) => {
					setDepartments(res.data);
				})
				.catch((err) => alert.error('oops ' + err.message));
		},
		[ props.isEdit, alert, instance ]
	);

	const onSubmit = (data) => {
		if (!data) return;
		if (!data.designation) return;
		props.handleSubmit(data);
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
							<select ref={register} name="department" id="department" multiple>
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

						{props.isEdit ? (
							<div>
								<p>Current departments</p>
								<ol>
									{selectedDepartments.map((d) => {
										return (
											<li key={d.department_id}>
												<p>
													{d.department}
													<input
														defaultChecked
														type="checkbox"
														className="float-right"
														onClick={(e) => {}}
													/>
												</p>
											</li>
										);
									})}
								</ol>
							</div>
						) : (
							''
						)}
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
