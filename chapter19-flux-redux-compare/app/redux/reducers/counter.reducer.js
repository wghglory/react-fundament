let initialState = 0;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    default:
      return state;
  }
}