
import React 							from 'react'
import { render } 						from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } 					from 'react-redux'
import App 								from './containers/App'
import todoApp 							from './reducers/'
import { createLogger } 				from 'redux-logger'
import thunk 							from 'redux-thunk'
import promiseMiddleware 				from 'redux-promise'
import { createAction } 				from 'redux-actions'




const logger = createLogger();

let store = createStore(
	todoApp,
	applyMiddleware(promiseMiddleware,thunk,logger)
	);

console.log('store:'+JSON.stringify(store.getState()));

let next = store.dispatch;

// store.dispatch = function dispatchAndLog(action){
// 	console.log('dispatching',action);
// 	next(action);
// 	console.log('next state',store.getState);
// }

var abc = {
	test: '234'
}

var obj = [...abc,'name':'345'];
// console.log(obj);



let rootElement = document.getElementById('reApp')
render(
  <Provider store = {store}>
    <App />
  </Provider>,
  rootElement
)