//rest base mappings...
const EMPLOYEE_REST_MAP = '/employee/';
const DEPARTMENT_REST_MAP = '/department/';
const POSITION_REST_MAP = '/position/';
const ALLOWANCE_REST_MAP = '/allowance/';
const DESIGNATION_REST_MAP = '/designation/';

//employees endpoints....
export const EMPLOYEES_ENDPOINT = `${EMPLOYEE_REST_MAP}employees`;
export const CREATE_EMPLOYEES_ENDPOINT = `${EMPLOYEE_REST_MAP}create`;
export const DELETE_EMPLOYEES_ENDPOINT = `${EMPLOYEE_REST_MAP}delete`;
export const DISABLE_EMPLOYEES_ENDPOINT = `${EMPLOYEE_REST_MAP}disable`;

//config endpoints
export const CREATE_DEPARTMENT_ENDPOINT = `${DEPARTMENT_REST_MAP}create`;
export const CREATE_POSITION_ENDPOINT = `${POSITION_REST_MAP}create`;
export const CREATE_ALLOWANCE_ENDPOINT = `${ALLOWANCE_REST_MAP}create`;
export const CREATE_DESIGNATION_ENDPOINT = `${DESIGNATION_REST_MAP}create`;

export const GET_ROLES_ENDPOINT = 'role/roles';
export const GET_CARDTYPES_ENDPOINT = 'role/card-types';
export const GET_DEPARTMENT_ENDPOINT = `${DEPARTMENT_REST_MAP}departments`;
export const GET_POSITION_ENDPOINT = `${POSITION_REST_MAP}positions`;
export const GET_ALLOWANCE_ENDPOINT = `${ALLOWANCE_REST_MAP}allowances`;
export const GET_DESIGNATION_ENDPOINT = `${DESIGNATION_REST_MAP}designations`;

export const DELETE_DEPARTMENT_ENDPOINT = `${DEPARTMENT_REST_MAP}delete`;
export const DELETE_POSITION_ENDPOINT = `${POSITION_REST_MAP}delete`;
export const DELETE_ALLOWANCE_ENDPOINT = `${ALLOWANCE_REST_MAP}delete`;
export const DELETE_DESIGNATION_ENDPOINT = `${DESIGNATION_REST_MAP}delete`;
