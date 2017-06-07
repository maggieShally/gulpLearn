export const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS';

export function submit(values){
	alert(JSON.stringify(values))
	return {
		type: SUBMIT_SUCCESS,
		values
	}

}