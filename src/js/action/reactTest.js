
import { createActions, handleActions, combineActions } from 'redux-actions'

const actionCreators = createActions({
	COUNT:{
		INCREASE:amount => ({ amount })
	}
	
})


export default actionCreators



// const INCREASEACTION = 'INCREASEACTION'

// const increaseAction = () => {
// 	console.log(increaseAction);
// 	return {
// 		type: INCREASEACTION
// 	}
// }


// export default {
// 	increaseAction,
// 	INCREASEACTION
// }