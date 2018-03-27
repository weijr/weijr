// ACTION TYPES

const ADD_RECIPIENT = 'ADD_RECIPIENT';

// ACTION CREATORS

export function addRecipient (content) {
  const action = { type: ADD_RECIPIENT, content };
  return action;
}

// REDUCER
export default function reducer (state = '', action) {

  switch (action.type) {

    case ADD_RECIPIENT:
      return action.content;

    default:
      return state;
  }

}
