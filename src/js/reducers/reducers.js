

import { createStore, combineReducers } 	from 'redux'
import { reducer as reduxFormReducer } from 'redux-form';


import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters,ADD_NUM,REDUCE_NUM ,GET_CUSTOMER_LIST} from '../action/actions.js'
const { SHOW_ALL } = VisibilityFilters

import customer from './customer-table'

function visibilityFilter(state = SHOW_ALL,action){
	switch(action.type) {
		case SET_VISIBILITY_FILTER:
			return action.filter;
		default:
			return state
	}
}


const datas = [
	{
		text: 'hello world',
		completed: false
	}

]


function todos(state = datas,action){
	switch(action.type) {
		case ADD_TODO:
			return [
				...state,
				{
					text: action.text,
					completed: false
				}
			]
		case TOGGLE_TODO:
			return state.map((todo,index) => {
				if(index === action.index){
					return Object.assign({},todo,{
						text: todo.text,
						completed: !todo.completed
					})
				}
				return todo
			})
		default:
			return state
	}
}

function numText(state = 0 ,action){
	switch(action.type){
		case ADD_NUM:
			return state + (action.val?action.val:1)
		case REDUCE_NUM:
			return state - (action.val?action.val:1)
		default:
			return state
	}
}


const customerList = [
	{
		name: 'name001',
		sex: 'female'
	}
];

function getCostomerList(state = customerList,action){
	switch(action.type){
		case GET_CUSTOMER_LIST:
			const tempList = [{
					name: 'name002',
					sex: 'female002'
				}
			];
			return state.concat(tempList);
		default:
			return state;
	}
}


const todoApp = combineReducers({
	form: reduxFormReducer,
	visibilityFilter,
	todos,
	numText,
	getCostomerList,
	customer
})

export default todoApp