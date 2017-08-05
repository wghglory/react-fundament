import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
import Result from './Result';
import Popular from './Popular';
import Visualization from './Visualization';
import Tasks from './Tasks';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Nav/>

                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/battle' component={Battle}/>
                        <Route path='/battle/result' component={Result}/>
                        <Route path='/popular' component={Popular}/>
                        <Route path='/visualization' component={Visualization} />
                        <Route path='/task' component={Tasks} />
                        <Route render={() => <p>Not found</p>}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;