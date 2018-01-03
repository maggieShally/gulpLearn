

import { createStore, combineReducers } 	from 'redux'
import { reducer as reduxFormReducer } from 'redux-form';

import submitForm 	from './cus-form'
import reactTest	from './reactTest'

var searchData = {
	'keywords': '搜索',
  	'sex': 0
}

 function searchFormData(state=searchData,action){
	if(action.form == 'search_form'){
			return state
	}
	return state
}




const todoApp = combineReducers({
	searchFormData,
	submitForm,
	reactTest,
	form:reduxFormReducer,
})

export default todoApp