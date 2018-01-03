import actionType from '../action/reactTest'

const state = {
	value : 1
}


const reatTest = (state = state, action)=>{
	switch(action.type){
		case actionType.INCREASEACTION:
			const val = state.value+1;
			return {...state, value: val};
		default: 
			return state
	}
}