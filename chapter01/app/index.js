let React = require('react')
let ReactDom = require('react-dom')
require('./index.css')

// component has state, lifecycle event, UI
class App extends React.Component{
    render(){
        return (
            <div>
                Hello React!
            </div>
        )
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('app')
)