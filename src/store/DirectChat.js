// ACTION TYPES

const ADD_USER = 'ADD_USER';

// ACTION CREATORS

export function addUser (content) {
  const action = { type: ADD_USER, content };
  return action;
}

// REDUCER
export default function reducer (state = '', action) {

  switch (action.type) {

    case ADD_USER:
      return action.content;

    default:
      return state;
  }

}
