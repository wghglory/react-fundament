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