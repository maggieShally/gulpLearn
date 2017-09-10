import { SUBMIT_SUCCESS,GET_CUSTOM_INFO } from '../action/cus-form'


const initForm = {
  firstName: 'Jane',
  lastName: 'Doe',
  sex: 'male',
  employed: true,
  email: 'langling10@163.com',
  favoriteColor: 'ff0000',
  notes: 'Born to write amazing Redux code.',
};


export default  function submitForm(state = {} ,action){
	switch(action.type){
		case SUBMIT_SUCCESS:
			alert('success');
			return state;
		case GET_CUSTOM_INFO:
			return Object.assign({},state,action.data)
		default:
			return state;
	}
}

