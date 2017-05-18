// not necessary, ProductsContainer.js dispatch can directly send data 

import * as ACT from '../constants/index.actionTypes';

export function incrementCount() {
  return { type: ACT.INCREMENT, payload: null };
}