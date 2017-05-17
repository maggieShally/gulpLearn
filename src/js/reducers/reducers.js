

import { combineReducers } from 'redux'

import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters,ADD_NUM,REDUCE_NUM } from '../action/actions.js'
const { SHOW_ALL } = VisibilityFilters



function visibilityFilter(state = SHOW_ALL,action){
	console.log(action.type);
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
			console.log(state);
			return [
				...state,
				{
					text: action.text,
					completed: false
				}
			]
		case TOGGLE_TODO:
			console.log(state);
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
	console.log(state);
	console.log(action.type);
	switch(action.type){
		case ADD_NUM:
			return state + (action.val?action.val:1)
		case REDUCE_NUM:
			return state - (action.val?action.val:1)
		default:
			return state
	}
}




const todoApp = combineReducers({
	visibilityFilter,todos,numText
})

export default todoApp