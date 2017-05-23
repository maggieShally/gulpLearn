export const DEL_CUSTOMER = 'DEL_CUSTOMER';

export function delCustomer(index){
	return {
		type: DEL_CUSTOMER,
		index
	}
}