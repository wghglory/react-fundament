import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import reducers from './redux/reducers/index.reducer';

// use redux store
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// let store = createStore(reducer, -10);
const store = createStore(reducers);

// use self created centralized store
// import createStore from './redux/stores/counter.store';
// let store = createStore(reducer, -10);
// let store = createStore(reducer, 0);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
