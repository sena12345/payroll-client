import { confirmAlert } from 'react-confirm-alert'; // Import

const options = {
	title               : 'Title',
	message             : 'Message',
	buttons             : [
		{
			label   : 'Yes',
			onClick : Function
		},
		{
			label   : 'No',
			onClick : onclose
		}
	],
	closeOnEscape       : true,
	closeOnClickOutside : true,
	willUnmount         : () => {},
	afterClose          : () => {},
	onClickOutside      : () => {},
	onKeypressEscape    : () => {},
	overlayClassName    : 'overlay-custom-class-name'
};
export const showConfirmAlert = (option = options) => {
	confirmAlert(option);
};
