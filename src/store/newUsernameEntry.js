// ACTION TYPES

const WRITE_USERNAME = 'WRITE_USERNAME';

// ACTION CREATORS

export function writeUsername (content) {
  const action = { type: WRITE_USERNAME, content };
  return action;
}

// REDUCER
export default function reducer (state = '', action) {

  switch (action.type) {

    case WRITE_USERNAME:
      return action.content;

    default:
      return state;
  }

}
