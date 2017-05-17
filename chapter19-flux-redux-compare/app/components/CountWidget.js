import React from 'react';

let CountWidget = ({ count, clickHandler }) => {
  return (
    <div>
      <p>{count}</p>
      <button onClick={clickHandler}>click</button>
    </div>
  );
};


export default CountWidget;
