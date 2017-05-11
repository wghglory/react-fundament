const React = require('react');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;

const Nav = require('./Nav');
import Home from './Home';
import Visualization from './Visualization';
const Battle = require('./Battle');
const Popular = require('./Popular');
const Result = require('./Result');

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Nav />

                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/battle' component={Battle} />
                        <Route path='/battle/result' component={Result} />
                        <Route path='/popular' component={Popular} />
                        <Route path='/visualization' component={Visualization} />
                        <Route render={() => <p>Not found</p>} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

module.exports = App;

