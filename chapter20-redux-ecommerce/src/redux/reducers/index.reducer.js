/**
 * 把所有 reducers 统一返回
 */
import { combineReducers } from 'redux';

import activeCategoryReducer from './activeCategory.reducer';
import productsReducer from './products.reducer';
import shoppingCartReducer from './shoppingCart.reducer';

const reducer = combineReducers({ activeCategoryReducer, productsReducer, shoppingCartReducer });
export default reducer;
