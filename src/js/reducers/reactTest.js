import actionType from '../action/reactTest'

const states = {
	value : 1
}


const reactTest = (state = states, action)=>{
	switch(action.type){
		case actionType.INCREASEACTION:
			const val = state.value+1;
			return {...state,value: val};
		default: 
			return states
	}
}


export default reactTest