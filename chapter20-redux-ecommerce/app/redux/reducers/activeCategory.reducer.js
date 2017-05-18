import { CHANGE_CATEGORY } from '../constants/index.actionTypes';

let initialState = 'food';
export default function activeCategoryReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return action.payload;
    default:
      return state;
  }
}