import React, { useState } from 'react';
import * as constants from '../../data-operations/_sahred/constants';
const Modal = (props) => {
	const [ itemName, setItemName ] = useState();
	const [ itemAmount, setItemAmount ] = useState();

	if (!props.show) {
		return null;
	}

	return (
		<div className="modal" onClick={props.onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<div className="modal-head">
					<h4>{props.title}</h4>
				</div>
				<div className="modal-body container">
					<div>
						<label htmlFor="item-name">Name</label>
						<input
							id="item-name"
							className="modal-field-value"
							type="text"
							value={itemName}
							onChange={(e) => {
								setItemName(e.target.value);
							}}
							placeholder="Item name"
						/>
					</div>
					{props.showAmount ? (
						<div>
							<label htmlFor="item-amount">Amount</label>
							<input
								id="itme-amount"
								className="modal-field-value"
								type="text"
								value={itemAmount}
								onChange={(e) => {
									setItemAmount(e.target.value);
								}}
								placeholder="Amount 500.20"
							/>
						</div>
					) : (
						''
					)}
				</div>
				<div className="modal-footer">
					<button onClick={props.onClose} className="modal-btn">
						Close
					</button>
					<button
						className="modal-btn"
						onClick={() => {
							props.isUpdate
								? props.handleSubmit(props.title, props.editData, itemName, itemAmount)
								: props.handleSubmit(props.title, itemName, itemAmount);
							setItemAmount(0.0);
							setItemName('');
						}}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
