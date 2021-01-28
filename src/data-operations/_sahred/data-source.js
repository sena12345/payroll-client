import axios from 'axios';

const axiosInstance = (currentUser) =>
	axios.create({
		baseURL : 'https://amalitect-payroll-api.herokuapp.com/api/v1',
		headers : {
			'Content-Type'                : 'application/json',
			'Access-Control-Allow-Origin' : '*'
			// 	Authorization  : `Basic ${Buffer.from(`${currentUser.email}:${currentUser.uid}`, 'utf8').toString(
			// 		'base64'
			// 	)}`
		}
	});

export default axiosInstance;
