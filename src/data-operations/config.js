import axiosInstance from './_sahred/data-source';
import * as enpoints from './_sahred/end-points';
const config = (currentUser) => {
	// console.log(currentUser);
	// const user = currentUser ? currentUser : auth.currentUser;
	const http = axiosInstance(currentUser);

	//get all roles
	async function getRoles() {
		return await http.get(enpoints.GET_ROLES_ENDPOINT);
	}

	/**
     * create new department...
     */
	async function createDepartment(department = {}) {
		return await http.post(enpoints.CREATE_DEPARTMENT_ENDPOINT, department);
	}

	/**
     * get list of departments...
     */
	async function getDepartments() {
		return await http.get(enpoints.GET_DEPARTMENTS_ENDPOINT);
	}

	/**
     * delete department...
     */
	async function deleteDepartment(department = {}) {
		return await http.delete(enpoints.DELETE_DEPARTMENT_ENDPOINT, department);
	}

	/**
     * create new position...
     */
	async function createPosition(position = {}) {
		return await http.post(enpoints.CREATE_POSITION_ENDPOINT, position);
	}

	/**
     * get list of positions...
     */
	async function getPositions() {
		return await http.get(enpoints.GET_POSITIONS_ENDPOINT);
	}

	/**
     * delete department...
     */
	async function deletePosition(position = {}) {
		return await http.delete(enpoints.DELETE_POSITION_ENDPOINT, department);
	}

	/**
     * create new allowance...
     */
	async function createAllowance(allowance = {}) {
		return await http.post(enpoints.CREATE_ALLOWANCE_ENDPOINT, allowance);
	}

	/**
     * get list of allowance...
     */
	async function getAllowances() {
		return await http.get(enpoints.GET_ALLOWANCE_ENDPOINT);
	}

	/**
     * delete allowance...
     */
	async function deleteAllowance(allowance = {}) {
		return await http.delete(enpoints.DELETE_ALLOWANCE_ENDPOINT, allowance);
	}

	/**
     * create new designation...
     */
	async function createDesignation(designation = {}) {
		return await http.post(enpoints.CREATE_DESIGNSTION_ENDPOINT, designation);
	}

	/**
     * get list of designation...
     */
	async function getAllDesignation() {
		return await http.get(enpoints.GET_DESIGNATION_ENDPOINT);
	}

	/**
     * delete designation...
     */
	async function deleteDesignation(designation = {}) {
		return await http.delete(enpoints.DELETE_DESIGNATION_ENDPOINT, designation);
	}

	//return function references...
	return {
		getRoles,
		createDepartment,
		getDepartments,
		deleteDepartment,
		createPosition,
		getPositions,
		deletePosition,
		createAllowance,
		getAllowances,
		deleteAllowance,
		createDesignation,
		getAllDesignation,
		deleteDesignation
	};
};

export default config;
