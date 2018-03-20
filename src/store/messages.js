import axios from 'axios';
// import socket from '../socket';

// ACTION TYPES

const GET_MESSAGE = 'GET_MESSAGE';
const GET_MESSAGES = 'GET_MESSAGES';

// ACTION CREATORS

export function getMessage (message) {
  const action = { type: GET_MESSAGE, message };
  return action;
}

export function getMessages (messages) {
  const action = { type: GET_MESSAGES, messages };
  return action;
}

// THUNK CREATORS

// export function postMessage (message) {

//   let apiLink = 'https://us-central1-mafia-blockchain.cloudfunctions.net/api/rooms/room1/generalChat'
//   return function thunk (dispatch) {
//     return axios.post(apiLink, message)
//   };
// }

// REDUCER

export default function reducer (state = [], action) {

  switch (action.type) {

    case GET_MESSAGES:
      return action.messages;

    case GET_MESSAGE:
      return [...state, action.message];

    default:
      return state;
  }

}
