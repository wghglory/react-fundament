# Redux mapStateToProps, mapDispatchToProps, combineReducers

containers folder: pass state, dispatch to its content's props.

```jsx
// ProductsContainer.js
import React from 'react';
import { connect } from 'react-redux';
import Products from '../components/Products';
import { ADD_TO_CART, REMOVE_FROM_CART, CHANGE_CATEGORY } from '../redux/constants/index.actionTypes';


/*export default class Products extends React.Component {
  render() {
    return (<Products />);
  }
}*/

function mapStateToProps(state) {
  return { products: state.productsReducer };
}

function mapDispatchToProps(dispatch) {
  return {
    clickHandler(id) {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          id
        }
      });
    }
  };
}

let ProductsContainer = connect(mapStateToProps, mapDispatchToProps)(Products);
export default ProductsContainer;
```

redux/reducers folder: Reducer(state, action){ return newState }

* When clicking the button, clickHandler dispatches actionType and payload to store. Store reducer executes and return new state. 
* Larger application has many reducers, we use combineReducers to combine them and pass to createStore

Redux has a function `combineReducers`, which combines all of the reducers into a single reducer. These reducers are used to build your state tree. The names of the fields match the names of the reducers that are passed in.

index.reducer.js

```javascript
import { combineReducers } from 'redux';

import activeCategoryReducer from './activeCategory.reducer';
import productsReducer from './products.reducer';
import shoppingCartReducer from './shoppingCart.reducer';

const reducer = combineReducers({ activeCategoryReducer, productsReducer, shoppingCartReducer });
export default reducer;
```

shoppingCart.reducer.js

```javascript
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
```