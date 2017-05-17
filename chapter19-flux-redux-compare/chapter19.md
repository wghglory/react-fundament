# React state, flux, redux

This article will compare flux and redux by a Counter demo.

## React State

index.js

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
```let initialState = 0;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    default:
      return state;
  }
}

components/App.js

```jsx
import React from 'react';

// react state
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { count: 0 };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.clickHandler}>click</button>
      </div>
    );
  }
}
```

## Flux

**When there is any click event, clickHanlder will call a specific action. This action calls dispatcher to dispatch the actionType and payload. Dispatcher registers the store's operator/reducer, so store knows how to manage data according to actionType and payload. After data changes, store emit an event. Since App passes callback function to store's addListener and removeListener, store will execute callback, which will setState and getData from store.**

Data flow: view clickEvent --> action --> dispatcher --> store --> cb to update view

components/App.js

```diff
import React from 'react';
+ import CounterStore from '../flux/stores/counter.store';
+ import { incrementCount } from '../flux/actions/counter.action';

export default class App extends React.Component {
  constructor(props) {
    super(props);

+    this.state = { count: CounterStore.getcount() };

    this.clickHandler = this.clickHandler.bind(this);
+    this._onChange = this._onChange.bind(this);
  }

+  _onChange() {
+    this.setState({ count: CounterStore.getcount() })
+  }
+
+  componentDidMount() {
+    CounterStore.addChangeListener(this._onChange);
+  }
+
+  componentWillUnmount() {
+    CounterStore.removeChangeListener(this._onChange);
+  }

  clickHandler() {
+    incrementCount();
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.clickHandler}>click</button>
      </div>
    );
  }
}
```

counter.actionTypes.js

```javascript
export const INCREMENT = 'increment';
```

counter.action.js

```jsx
import dispatcher from '../dispatcher';
import * as ACT from '../constants/counter.actionTypes';

export function incrementCount() {
  dispatcher.dispatch({ type: ACT.INCREMENT, payload: null });
}
```

dispatcher.js

```javascript
import { Dispatcher } from 'flux';

export default new Dispatcher();
```

counter.store.js

```javascript
/**
 * place to store data, and then bind to react state
 * 1. action sends action and data to dispatcher, 
 * 2. dispatcher registers store's data operation command
 * 3. store operates its data center based on the action and data from action and dispatcher
 */

import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import * as ACT from '../constants/counter.actionTypes';

class CounterStore extends EventEmitter {
  constructor() {
    super();

    this.count = 0;

    this.operate = this.operate.bind(this);
  }

  addChangeListener(cb) {    
    this.on('change', cb);
  }

  removeChangeListener(cb) {
    this.on('change', cb);
  }

  getcount() {
    return this.count;  
  }

  incrementCount(payload) {
    this.count = this.count + 1;
    this.emit('change');
  }

  operate({ type, payload }) {
    switch (type) {
      case ACT.INCREMENT:
        this.incrementCount(payload);
        break;
      default:
        break;
    }
  }

}

const store = new CounterStore();

dispatcher.register(store.operate);

export default store;
```

## Redux

**When there is any click event, clickHanlder will call a specific action. This action calls store.dispatch with actionType and payload. Store dispatch internally will do 2 things. First, it calls reducer which passes to createStore method. Second, and then execute callback subscribed by store. Reducer accepts previous state, actionType as parameters and then return next state. All callback methods in subscribers array will be executed. Usually cb will getState() to re-render view.**

index.js

```diff
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

+ import reducer from './redux/reducers/counter.reducer';
+ // use redux store
+ import { createStore } from 'redux';
+ // let store = createStore(reducer, -10);
+ const store = createStore(reducer);
+ 
+ // use self created centralized store
+ // import createStore from './redux/stores/counter.store';
+ // let store = createStore(reducer, -10);
+ // let store = createStore(reducer, 0);

ReactDOM.render(
+    <App store={store} />,
    document.getElementById('app')
);
```

counter.reducer.js

```javascript
let initialState = 0;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    default:
      return state;
  }
}
```

components/App.js

```diff
import React from 'react';
+ import * as ACT from '../redux/constants/counter.actionTypes';

export default class App extends React.Component {
  constructor(props) {
    super(props);

+    this.state = { count: this.props.store.getState() };

    this.clickHandler = this.clickHandler.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
+    this.setState({ count: this.props.store.getState() });
  }

  componentDidMount() {
+    this.props.store.subscribe(this._onChange);
  }

  clickHandler() {
    // you can still create an action file, and internally call dispatch like flux
+    this.props.store.dispatch({ type: ACT.INCREMENT, payload: null });
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.clickHandler}>click</button>
      </div>
    );
  }
}
```

redux store' core:

```javascript
/**
 * Not needed since we are using redux store, but below describes how redux store works
 */
export default function createStore(reducer, initialState) {
  let state = initialState;
  let subscribers = [];

  function getState() {
    return state;
  }

  function subscribe(cb) {
    subscribers.push(cb);
  }

  function dispatch(action) {
    state = reducer(state, action);
    subscribers.forEach(sub => {
      sub();
    });
  }

  return { getState, subscribe, dispatch };
}
```

# Difference between Redux and Flux

1. Redux only has one centralized store while flux has many
1. Redux doesn't need dispatcher
1. Redux store is lightweight
1. Redux: reducer describe how prev state + flux action to a next state.
1. Redux has a help library "react-redux"

