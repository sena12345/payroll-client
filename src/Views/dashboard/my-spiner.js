import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
export const MyLoader = () => {
	return (
		<div className="spinerContainer">
			<ScaleLoader loading={true} color="#d95a27" width={4} radius={2} height={35} margin={2} size={15} />
		</div>
	);
};
