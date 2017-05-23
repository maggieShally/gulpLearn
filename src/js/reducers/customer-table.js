import { combineReducers } from 'redux'

import * as Actions from '../action/customer-tables'

const initial_state = {
	cusData:[
				{
					name: '小小001',
					sex: '女001',
					tel: '12888984732'
				},
				{
					name: '小小002',
					sex: '女002',
					tel: '12888984732'
				},  
				{
					name: '小小003',
					sex: '女004',
					tel: '12888984732'
				}
			],
			cusArr:[]
}

export default function cusMain(state = initial_state,action){
	switch(action.type){
		case Actions.DEL_CUSTOMER:
			var tempDate = state.cusData.slice()
			console.log(state);
			tempDate.splice(action.index,1)
			console.log(tempDate);
			return {cusData:state.cusData, cusData:tempDate}
		default:
			return state

	}
}