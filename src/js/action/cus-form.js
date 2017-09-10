export const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS';
export const GET_CUSTOM_INFO = 'GET_CUSTOM_INFO';


export function submit(values){
	return {
		type: SUBMIT_SUCCESS,
		values
	}

}

export function getCustomInfo(data){
	console.log(data);
	return {
		type:  GET_CUSTOM_INFO,
		data
	}
}