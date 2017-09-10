

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const ADD_NUM = 'ADD_NUM';
export const REDUCE_NUM = 'REDUCE_NUM';

export const SEARCH_FROM = 'SEARCH_FROM';

export const VisibilityFilters = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_COMPLETED: 'SHOW_COMPLETED',
	SHOW_ACTIVE: 'SHOW_ACTIVE'
}



//active 创建函数

 export function addTodo(text){
 	return {
 		type: ADD_TODO,
 		text: text
 	}
 }

 export function toggleTodo(index){
 	return {
 		type: TOGGLE_TODO,
 		index
 	}
 }


export function addNum(val){
	return {
		type: ADD_NUM,
		val
	}
}


export function reduceNum(val){
	return {
		type: REDUCE_NUM,
		val
	}
}

 export function setVisibilityFilter(filter){
 	return {
 		type : SET_VISIBILITY_FILTER,filter
 	}
 }

 export const GET_CUSTOMER_LIST = 'GET_CUSTOMER_LIST'

 export function getTempList(){
 	return (dispatch) => {
 		return fetch('https://api.github.com/users/octocat/gists')
 		.then(response => response.json())
 		.then(json => dispatch({type: GET_CUSTOMER_LIST,json}))
 	}
 }