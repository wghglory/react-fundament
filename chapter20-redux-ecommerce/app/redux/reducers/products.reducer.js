// import { ADD_TO_CART, REMOVE_FROM_CART, CHANGE_CATEGORY } from '../constants/counter.actionTypes';

let initialState = [
  { id: 1, name: 'pizza', cost: 10, category: 'food' },
  { id: 2, name: 'apple', cost: 5, category: 'food' },
  { id: 3, name: 'tv', cost: 1000, category: 'electronics' },
  { id: 4, name: 'phone', cost: 300, category: 'electronics' }
];

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}