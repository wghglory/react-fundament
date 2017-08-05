import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import reducer from './redux/reducers/counter.reducer';
// use redux store
import { createStore } from 'redux';
// let store = createStore(reducer, -10);
const store = createStore(reducer);

// use self created centralized store
// import createStore from './redux/stores/counter.store';
// let store = createStore(reducer, -10);
// let store = createStore(reducer, 0);

ReactDOM.render(
    <App store={store} />,
    document.getElementById('app')
);
