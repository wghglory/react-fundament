import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css'

// component has state, lifecycle event, UI
class App extends React.Component {
    render() {
        return (
            <div>
                Hello React!
            </div>
        )
    }
}

ReactDOM.render(
    <App/>, document.getElementById('app')
)