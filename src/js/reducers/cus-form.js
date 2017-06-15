import { SUBMIT_SUCCESS } from '../action/cus-form'


// const initForm = {
//   // used to populate "account" reducer when "Load" is clicked
//   firstName: 'Jane',
//   lastName: 'Doe',
//   sex: 'male',
//   employed: true,
//   email: 'langling10@163.com',
//   favoriteColor: 'ff0000',
//   notes: 'Born to write amazing Redux code.',
// };


export default  function submitForm(state={},action){
	switch(action.type){
		case SUBMIT_SUCCESS:
			alert('success');
			return state;
		default:
			return state;
	}
}

