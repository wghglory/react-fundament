import React from 'react';
import ProductsContainer from '../containers/ProductsContainer';
import ShoppingCartContainer from '../containers/ShoppingCartContainer';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Redux demo</h1>
        <ProductsContainer />
        <ShoppingCartContainer />
      </div>
    );
  }
}



