
import { createActions, handleActions, combineActions } from 'redux-actions'

const INCREASEACTION = 'INCREASEACTION'

const increaseAction = () => {
	return {
		type: INCREASEACTION
	}
}


export default {
	INCREASEACTION
}