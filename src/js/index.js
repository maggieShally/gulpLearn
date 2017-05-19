
import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import todoApp from './reducers/reducers'
import createLogger from 'redux-logger'

const logger = createLogger();


let store = createStore(
	todoApp,
	applyMiddleware(logger)
	);

store.getState();

let next = store.dispatch;

store.dispatch = function dispatchAndLog(action){
	console.log('dispatching',action);
	next(action);
	console.log('next state',store.getState);
}

let rootElement = document.getElementById('reApp')
render(
  <Provider store = {store}>
    <App />
  </Provider>,
  rootElement
)