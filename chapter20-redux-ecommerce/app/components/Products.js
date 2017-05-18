import React from 'react';
import Product from './Product';

let Products = ({ products, clickHandler }) => {
  return (
    <section>
      <h2>Our products</h2>
      {products.map(p => (
        <Product key={p.id} {...p} clickHandler={clickHandler}>Add to Cart</Product>
      ))}
    </section>
  );
};

export default Products;