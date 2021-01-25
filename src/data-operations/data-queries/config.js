import axiosInstance from '../_sahred/data-source';
import * as enpoints from '../_sahred/end-points';

const config = (currentUser) => {
	// console.log(currentUser);
	// const user = currentUser ? currentUser : auth.currentUser;
	const http = axiosInstance(currentUser);

	//get all roles
	async function getRoles() {
		return await http.get(enpoints.GET_ROLES_ENDPOINT);
	}

	/**
     * get card types...
     */
	async function getCardTypes() {
		return await http.get(enpoints.GET_CARDTYPES_ENDPOINT);
	}

	/**
     * create new department...
     */
	async function createDepartment(department = {}) {
		return await http.post(enpoints.CREATE_DEPARTMENT_ENDPOINT, department);
	}
	/**
     * update department...
     */
	async function updateDepartment(department = { department_id: -1, department: '' }) {
		return await http.patch(enpoints.UPDATE_DEPARTMENT_ENDPOINT, department);
	}

	/**
     * get list of departments...
     */
	async function getDepartments() {
		return await http.get(enpoints.GET_DEPARTMENT_ENDPOINT);
	}

	/**
     * delete department...
     */
	async function deleteDepartment(department = {}) {
		return await http.delete(enpoints.DELETE_DEPARTMENT_ENDPOINT, { data: department });
	}

	/**
     * create new position...
     */
	async function createPosition(position = {}) {
		return await http.post(enpoints.CREATE_POSITION_ENDPOINT, position);
	}
	/**
     * update position...
     */
	async function updatePosition(position = { position_id: -1, position: '' }) {
		return await http.patch(enpoints.UPDATE_POSITION_ENDPOINT, position);
	}

	/**
     * get list of positions...
     */
	async function getPositions() {
		return await http.get(enpoints.GET_POSITION_ENDPOINT);
	}

	/**
     * delete department...
     */
	async function deletePosition(position = {}) {
		return await http.delete(enpoints.DELETE_POSITION_ENDPOINT, { data: position });
	}

	/**
     * create new allowance...
     */
	async function createAllowance(allowance = {}) {
		return await http.post(enpoints.CREATE_ALLOWANCE_ENDPOINT, allowance);
	}
	/**
     * update allowance...
     */
	async function updateAllowance(allowance = { allowance_id: -1, allowance: '', amount: 0.0 }) {
		return await http.patch(enpoints.UPDATE_ALLOWANCE_ENDPOINT, allowance);
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
		return await http.delete(enpoints.DELETE_ALLOWANCE_ENDPOINT, { data: allowance });
	}

	/**
     * create new designation...
     */
	async function createDesignation(designation = {}) {
		return await http.post(enpoints.CREATE_DESIGNATION_ENDPOINT, designation);
	}
	/**
     * update designation...
     */
	async function updateDesignation(designation = { designation_id: -1, designation: '' }) {
		return await http.patch(enpoints.UPDATE_DESIGNATION_ENDPOINT, designation);
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
		return await http.delete(enpoints.DELETE_DESIGNATION_ENDPOINT, { data: designation });
	}

	//return function references...
	return {
		getRoles,
		getCardTypes,
		createDepartment,
		updateDepartment,
		getDepartments,
		deleteDepartment,
		createPosition,
		updatePosition,
		getPositions,
		deletePosition,
		createAllowance,
		updateAllowance,
		getAllowances,
		deleteAllowance,
		createDesignation,
		updateDesignation,
		getAllDesignation,
		deleteDesignation
	};
};

export default config;
