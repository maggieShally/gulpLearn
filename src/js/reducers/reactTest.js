import { createActions, handleActions, combineActions } from 'redux-actions'


import actionCreatorsReactTest from '../action/reactTest'



const initState = {
	value : 1,
	phone: undefined,
	password: undefined,
}


const reactTest =  handleActions({
	REACTTEST: {
		COUNT:{
			INCREASE:(state, action)=>{
				console.log(action.payload);
				let val = state.value + 1 ;
				return {...state,value: val}
			}
		},
		SET:{
			PHONE:(state, action)=>{
				console.log(action.payload);
				return {...state,phone: action.payload}
			},
			PASSWORD:( state, action) => {
				return {...state,password: action.payload}
			}
		},
		EFFECTS: {
			SUBMIT_INFO:(state, action) => {
				console.log(action.payload);
				return {...state}
			}
		}
	}
},
initState
)

export default reactTest







// import actionType from '../action/reactTest'

// const initState = {
// 	value : 1
// }


// const reactTest = (state = initState, action)=>{
// 	switch(action.type){
// 		case 'REACTTEST/COUNTER/INCREASE':
// 			console.log(action.payload);
// 			const val = state.value+1;
// 			return {...state, value: val};
// 		default: 
// 			return state
// 	}
// }

// export default reactTest