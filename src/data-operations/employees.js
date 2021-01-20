import axiosInstance from './_sahred/data-source';
import * as enpoints from './_sahred/end-points';

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
	async function addEmployees(employeeData = {}) {
		return await http.post(enpoints.CREATE_EMPLOYEES_ENDPOINT, employeeData);
	}

	/**
     * disable list of employees...
     */
	async function disableEmployees(employees = []) {
		return await http.patch(enpoints.DISABLE_EMPLOYEES_ENDPOINT, employees);
	}

	/**
     * disable list of employees...
     */
	async function deleteEmployees(employees = []) {
		return await http.post(enpoints.DISABLE_EMPLOYEES_ENDPOINT, employees);
	}

	//return function references...
	return { getEmployees, addEmployees, disableEmployees, deleteEmployees };
};

export default employeesInstance;
