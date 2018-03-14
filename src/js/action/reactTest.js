
import { createActions, handleActions, combineActions } from 'redux-actions'

const actionCreators = createActions({
	REACTTEST: {
		COUNT:{
			// INCREASE:amount => ({ amount }),
			INCREASE: undefined,

		},
		SET: {
			PHONE: undefined,
			PASSWORD: undefined,
		},
		EFFECTS : {
			SUBMIT_INFO: userInfo => ({...userInfo})	
		}
	}
	
})


export default actionCreators;