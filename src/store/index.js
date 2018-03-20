import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import messages from './messages';
import newMessageEntry from './newMessageEntry';
import loggingMiddleware from 'redux-logger'

const reducer = combineReducers({ messages, newMessageEntry })

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    loggingMiddleware
  ))
);

export default store

export * from './messages';
export * from './newMessageEntry';
