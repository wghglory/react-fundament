import React from 'react';
import Product from './Product';

let ShoppingCart = ({ products, clickHandler }) => {
  return (
    <section>
      <h2>Shopping Cart</h2>
      {products.map(p => (
        <Product key={p.id} {...p} clickHandler={clickHandler}>Remove from Cart</Product>
      ))}
    </section>
  );
};

export default ShoppingCart;