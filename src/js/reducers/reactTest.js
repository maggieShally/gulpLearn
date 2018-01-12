import { createActions, handleActions, combineActions } from 'redux-actions'


import actionCreatorsReactTest from '../action/reactTest'



const initState = {
	value : 1
}


const reactTest = handleActions({
	COUNT: {
		INCREASE: (state, action) => {
			let val = state.value+1;
			return { ...state, value: val  }
		}
	},
	// "COUNT/INCREASE":(state, action) => {
	// 	let val = state.value+1;
	// 	return { ...state, value: val  }
	// }
  }, initState)

// const reactTest =  handleActions({
// 	REACTTEST:{
// 		COUNTER:{
// 			INCREASE:(state, action)=>{
// 				console.log(action.payload);
// 				let val = state.value +1 ;
// 				return {...state,value: val}
// 			}
// 		}
// 	}
// },
// initState
// )



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