// not necessary, ProductsContainer.js dispatch can directly send data 

import * as ACT from '../constants/index.actionTypes';

export function addToCart() {
  return { type: ACT.ADD_TO_CART, payload: null };
}
export function removeFromCart() {
  return { type: ACT.REMOVE_FROM_CART, payload: null };
}
export function changeCategory() {
  return { type: ACT.CHANGE_CATEGORY, payload: null };
}