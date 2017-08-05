import { ADD_TO_CART, REMOVE_FROM_CART } from '../constants/index.actionTypes';

// product id, 1, 2, 3
let initialState = [];
export default function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload.id];
    case REMOVE_FROM_CART:
      return state.filter((pId) => pId !== action.payload.id);
    default:
      return state;
  }
}