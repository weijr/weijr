// ACTION TYPES

const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER'

// ACTION CREATORS

export function setUser (user) {
  const action = { type: SET_USER, user };
  return action;
}

export function clearUser (user) {
  const action = { type: CLEAR_USER, user };
  return action
}

// REDUCER
export default function reducer (state = '', action) {

  switch (action.type) {

    case SET_USER:
      return action.user;

    case CLEAR_USER:
      return '';

    default:
      return state;
  }

}
