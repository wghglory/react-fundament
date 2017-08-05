import React from 'react';
import { connect } from 'react-redux';
import ShoppingCart from '../components/ShoppingCart';
import { ADD_TO_CART, REMOVE_FROM_CART, CHANGE_CATEGORY } from '../redux/constants/index.actionTypes';

function getProductsInCart(products, shoppingCart) {
  return products.filter(p => shoppingCart.includes(p.id));
}

function mapStateToProps(state) {
  return { products: getProductsInCart(state.productsReducer, state.shoppingCartReducer) };
}

function mapDispatchToProps(dispatch) {
  return {
    clickHandler(id) {
      dispatch({
        type: REMOVE_FROM_CART,
        payload: {
          id
        }
      });
    }
  };
}

let ShoppingCartContainer = connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
export default ShoppingCartContainer;