const React = require('react');
const ReactDom = require('react-dom');

// bootstrap core. specific plugin like jumbotron is imported in needed component.
import './bootstrap/_core.scss';

// custom css below bootstrap
require('./index.css');
require('./index.scss');

const App = require('./components/App');

ReactDom.render(
    <App/>,
    document.getElementById('app')
);