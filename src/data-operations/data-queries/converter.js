export const ConvertedRoles = (data = []) => {
	const rolesConverted = [];

	data.forEach((rol) => {
		rolesConverted.push({ label: rol.role, value: rol.role_id });
	});

	return rolesConverted;
};

export const ConvertedDepartment = (data = []) => {
	const departmentConverted = [];

	data.forEach((dep) => {
		departmentConverted.push({ label: dep.department, value: dep.department_id });
	});

	return departmentConverted;
};

export const ConvertedDesignations = (data = []) => {
	const designationConverted = [];

	data.forEach((des) => {
		designationConverted.push({ label: des.designation, value: des.designation_id });
	});

	return designationConverted;
};
