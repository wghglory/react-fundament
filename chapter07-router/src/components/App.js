import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
import Popular from './Popular';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Nav/>

                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/battle' component={Battle}/>
                        <Route path='/popular' component={Popular}/>
                        <Route render={() => <p>Not found</p>}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;