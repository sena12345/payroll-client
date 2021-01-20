const CURRENT_DATE_TIME = new Date().toISOString().slice(0, 19).replace('T', ' ');

export const Employee = {
	uid: '',
	employee_id: '',
	email: '',
	name: '',
	salary: 0.0,
	disable: false,
	roles: [],
	positions: [],
	departments: [],
	allowances: [],
	designations: []
};

export const Roles = {
	role_id: null,
	role: '',
	date: CURRENT_DATE_TIME
};

export const Position = {
	position_id: null,
	position: '',
	date: CURRENT_DATE_TIME
};

export const Department = {
	department_id: null,
	department: '',
	date: CURRENT_DATE_TIME
};

export const Allowance = {
	allowance_id: null,
	allowance: '',
	amount: 0.0,
	date: CURRENT_DATE_TIME
};
