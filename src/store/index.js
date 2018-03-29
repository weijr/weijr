import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import wagers from './wagers';
import user from './user'
import DirectChat from './DirectChat'
import loggingMiddleware from 'redux-logger'

const reducer = combineReducers({ wagers, user, DirectChat })

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    loggingMiddleware
  ))
);

export default store
export * from './wagers';
export * from './user';
export * from './DirectChat'
