const React = require('react');
const ReactDom = require('react-dom');

// bootstrap core 
import './bootstrap/_core.scss';
// import './bootstrap/jumbotron.scss';  //question: jumbotron.scss internally import _core.scss, how to avoid duplicate?

// custom css below bootstrap
require('./index.css');
require('./index.scss');

const App = require('./components/App');

ReactDom.render(
    <App/>,
    document.getElementById('app')
);