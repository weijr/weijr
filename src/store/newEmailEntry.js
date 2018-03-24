const WRITE_EMAIL = 'WRITE_EMAIL';

export function writeEmail (content) {
  const action = { type: WRITE_EMAIL, content };
  return action;
}

export default function reducer (state = '', action) {

  switch (action.type) {

    case WRITE_EMAIL:
      return action.content;

    default:
      return state;
  }

}
