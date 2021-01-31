import React from 'react';

import { useForm } from 'react-hook-form';

export default function DepartmentModal(props) {
	// const { currentUser } = useAuth();
	// const instance = Config(currentUser);
	// const alert = useAlert();
	// const [ departments, setDepartments ] = useState([ Department ]);
	const { register, handleSubmit, reset } = useForm();

	// useEffect(
	// 	() => {
	// 		instance
	// 			.getDepartments()
	// 			.then((res) => {
	// 				setDepartments(res.data);
	// 			})
	// 			.catch((err) => alert.error('oops ' + err.message));
	// 	},
	// 	[ props.isEdit ]
	// );

	const onSubmit = (data) => {
		if (!data) return;
		if (!data.department) return;
		props.handleSubmit(data);
	};

	return props.show ? (
		<div className="modal" onClick={props.onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="modal-content" onClick={(e) => e.stopPropagation()}>
					<div className="modal-head">
						<h4>{`Department`}</h4>
					</div>
					<div className="modal-body container">
						<div>
							<label htmlFor="department">Department</label>
							<input
								defaultValue={props.isEdit ? props.data.department : ''}
								ref={register({ required: true })}
								id="department"
								name="department"
								className="modal-field-value"
								type="text"
								placeholder="Item name"
							/>
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
