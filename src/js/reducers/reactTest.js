import actionType from '../action/reactTest'

const initState = {
	value : 1
}


const reactTest = (state = initState, action)=>{
	switch(action.type){
		case actionType.INCREASEACTION:
			const val = state.value+1;
			return {...state, value: val};
		default: 
			return state
	}
}

export default reactTest