// ACTION TYPES

const WRITE_PASSWORD = 'WRITE_PASSWORD';

// ACTION CREATORS

export function writePassword (content) {
  const action = { type: WRITE_PASSWORD, content };
  return action;
}

// REDUCER
export default function reducer (state = '', action) {

  switch (action.type) {

    case WRITE_PASSWORD:
      return action.content;

    default:
      return state;
  }

}
