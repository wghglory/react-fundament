import React from 'react';

let Product = ({ id, name, cost, clickHandler, children }) => (
  <div>
    {name} ${cost} <button onClick={() => clickHandler(id)}>{children}</button>
  </div>
);

export default Product;