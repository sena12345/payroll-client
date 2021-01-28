const CURRENT_DATE_TIME = new Date().toISOString().slice(0, 19).replace('T', ' ');

export const Roles = {
	role_id : null,
	role    : '',
	date    : CURRENT_DATE_TIME
};

export const Position = {
	position_id : null,
	position    : '',
	date        : CURRENT_DATE_TIME
};

export const Department = {
	department_id : null,
	department    : '',
	date          : CURRENT_DATE_TIME
};

export const Allowance = {
	allowance         : '',
	amount            : 0.0,
	percentage        : 0,
	frequency         : 0,
	toAllDesignations : false,
	toAllDepartments  : false,
	date              : '2021-01-25T09:09:43.377',
	departments       : [],
	designations      : [],
	departmental      : false,
	flat              : false
};

export const Designation = {
	designation_id : '',
	designation    : '',
	date           : CURRENT_DATE_TIME,
	departments    : [
		{
			department_id : '',
			department    : '',
			date          : CURRENT_DATE_TIME
		}
	]
};

export const Employee = {
	uid           : '',
	employee_id   : '',
	email         : '',
	name          : '',
	cardType      : 0,
	cardNumber    : '',
	basic_salary  : 0.0,
	disable       : false,
	marriage_cert : '',
	tin           : '',
	roles         : [ Roles ],
	positions     : [ Position ],
	departments   : [ Department ],
	allowances    : [ Allowance ],
	designations  : [ Designation ]
};
