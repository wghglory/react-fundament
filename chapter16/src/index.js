// bootstrap core. specific plugin like jumbotron is imported in needed component.
import './bootstrap/_core.scss';

// custom css below bootstrap
import './index.css';
import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);