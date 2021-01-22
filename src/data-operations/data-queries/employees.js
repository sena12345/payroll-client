import axiosInstance from '../_sahred/data-source';
import * as enpoints from '../_sahred/end-points';
import { Employee } from '../_sahred/models';
const employeesInstance = (currentUser) => {
	// const user = currentUser ? currentUser : auth.currentUser;
	const http = axiosInstance(currentUser);

	//get all employees
	async function getEmployees(page = 0) {
		return await http.get(enpoints.EMPLOYEES_ENDPOINT.concat(`?&page=${page}`));
	}

	/**
     * create new employee...
     */
	async function addEmployees(employeeObject) {
		return await http.post(enpoints.CREATE_EMPLOYEES_ENDPOINT, employeeObject);
	}

	/**
     * update employee data...
     */
	async function updateEmployee(employeeObject) {
		return await http.patch(enpoints.UPDATE_EMPLOYEES_ENDPOINT, employeeObject);
	}

	/**
     * disable list of employees...
     */
	async function disableEmployees(employees) {
		return await http.patch(enpoints.DISABLE_EMPLOYEES_ENDPOINT, employees);
	}

	/**
     * disable list of employees...
     */
	async function deleteEmployees(employees = [ Employee ]) {
		return await http.post(enpoints.DISABLE_EMPLOYEES_ENDPOINT, employees);
	}

	//return function references...
	return { getEmployees, addEmployees, updateEmployee, disableEmployees, deleteEmployees };
};

export default employeesInstance;
