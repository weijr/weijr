import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import messages from './messages';
import newMessageEntry from './newMessageEntry';
import newUsernameEntry from './newUsernameEntry'
import newPasswordEntry from './newPasswordEntry'
import DirectChat from './DirectChat'
import user from './user'
import loggingMiddleware from 'redux-logger'

const reducer = combineReducers({ messages, newMessageEntry, newUsernameEntry, newPasswordEntry, DirectChat, user })

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
export * from './newUsernameEntry';
export * from './newPasswordEntry';
export * from './user';
export * from './DirectChat'
