const ADD_RECIPIENT = 'ADD_RECIPIENT';

export function addRecipient (content) {
  const action = { type: ADD_RECIPIENT, content };
  return action;
}

export default function reducer (state = '', action) {

  switch (action.type) {

    case ADD_RECIPIENT:
      return action.content;

    default:
      return state;
  }

}
