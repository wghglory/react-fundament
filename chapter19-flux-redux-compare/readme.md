# React state, flux, redux

This article will compare flux and redux by a Counter demo.

## Flux

**When there is any click event, clickHandler will call a specific action. This action calls dispatcher to dispatch the actionType and payload. Dispatcher registers the store's operator/reducer, so store knows how to manage data according to actionType and payload. After data changes, store emit an event. Since App passes callback function to store's addListener and removeListener, store will execute callback, which will setState and getData from store.**

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

**When there is any click event, clickHandler will call a specific action. This action calls store.dispatch with actionType and payload. Store dispatch internally will do 2 things. First, it calls reducer which passes to createStore method. Second, and then execute callback subscribed by store. Reducer accepts previous state, actionType as parameters and then return next state. All callback methods in subscribers array will be executed. Usually cb will getState() to re-render view.**

### Reducer

Our entire state tree is stored in a single object. A potential complaint might be that it’s not modular enough, possibly because you’re considering modularity as describing objects. Redux achieves modularity via functions. Functions are used to update parts of the state tree. These functions are called reducers.

**Reducers are functions that take the current state along with an action as arguments and return a new state. The important thing to notice here is that the state is not changed directly. Instead a new state object (based on the old state) is created and the update is done to the new state.**. Reducers are designed to update specific parts of the state tree, either leaves or branches. We can then compose reducers into one reducer that can handle updating the entire state of our app given any action.

#### REDUCER COMPOSITION IS NOT REQUIRED, JUST RECOMMENDED

Redux does not require that we create smaller, more focused reducers and compose them into a single reducer. We could create one reducer function to handle every action in our app. In doing so, we would lose the benefits of modularity and functional programming.

To recap, state updates are handled by reducers. Reducers are pure functions that take in state as the first argument and an action as the second argument. Reducers do not cause side effects and should treat their arguments as immutable data. In Redux, modularity is achieved through reducers. Eventually, reducers are combined into a single reducer, a function that can update the entire state tree.

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

### The Store

In Redux, the store is what holds the application’s state data and handles all state updates.5 While the Flux design pattern allows for many stores that each focus on a specific set of data, Redux only has one store.

The store handles state updates by passing the current state and action through a single reducer. We will create this single reducer by combining and composing all of our reducers.

`const store = createStore(reducer, [initialState]);`

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

### Subscribing to Stores

Stores allow you to subscribe handler functions that are invoked every time the store completes dispatching an action. In the following example, we will log the count of colors in the state:

```javascript
store.subscribe(() =>
    console.log('color count:', store.getState().colors.length)
)

store.dispatch({
    type: "ADD_COLOR",
    id: "2222e1p5-3abl-0p523-30e4-8001l8yf2222",
    title: "Party Pink",
    color: "#F142FF",
    timestamp: "Thu Mar 10 2016 01:11:12 GMT-0800 (PST)"
})

store.dispatch({
    type: "ADD_COLOR",
    id: "3315e1p5-3abl-0p523-30e4-8001l8yf2412",
    title: "Big Blue",
    color: "#0000FF",
    timestamp: "Thu Mar 10 2016 01:11:12 GMT-0800 (PST)"
})

store.dispatch({
    type: "RATE_COLOR",
    id: "2222e1p5-3abl-0p523-30e4-8001l8yf2222",
    rating: 5
})

store.dispatch({
    type: "REMOVE_COLOR",
    id: "3315e1p5-3abl-0p523-30e4-8001l8yf2412"
})

// Console Output

// color count: 1
// color count: 2
// color count: 2
// color count: 1
```

Subscribing this listener to the store will log the color count to the console every time we submit an action. In the preceding example we see four logs: the first two for `ADD_COLOR`, the third for `RATE_COLOR`, and the fourth for `REMOVE_COLOR`.

The store’s subscribe method returns a function that you can use later to unsubscribe the listener:

```javascript
const logState = () => console.log('next state', store.getState())

const unsubscribeLogger = store.subscribe(logState)

// Invoke when ready to unsubscribe the listener
unsubscribeLogger()
```

### Saving to localStorage

Using the store’s subscribe function, we will listen for state changes and save those changes to `localStorage` under the key 'redux-store'. When we create the store we can check to see if any data has been saved under this key and, if so, load that data as our initial state. With just a few lines of code, we can have persistent state data in the browser:

```javascript
const store = createStore(
    combineReducers({ colors, sort }),
    (localStorage['redux-store']) ?
        JSON.parse(localStorage['redux-store']) :
        {}
)

store.subscribe(() => {
  localStorage['redux-store'] = JSON.stringify(store.getState())
})

console.log('current color count', store.getState().colors.length)
console.log('current state', store.getState())

store.dispatch({
    type: "ADD_COLOR",
    id: uuid.v4(),
    title: "Party Pink",
    color: "#F142FF",
    timestamp: new Date().toString()
})
```

To recap, stores hold and manage state data in Redux applications, and the only way to change state data is by dispatching actions through the store. The store holds application state as a single object. State mutations are managed through reducers. Stores are created by supplying a reducer along with optional data for the initial state. Also, we can subscribe listeners to our store (and unsubscribe them later), and they will be invoked every time the store finishes dispatching an action.

### Action Creators

Action objects are simply JavaScript literals. Action creators are functions that create and return these literals. Let’s consider the following actions:

```json
{
  type: "REMOVE_COLOR",
  id: "3315e1p5-3abl-0p523-30e4-8001l8yf2412"
}

{
  type: "RATE_COLOR",
  id: "441e0p2-9ab4-0p523-30e4-8001l8yf2412",
  rating: 5
}
```

We can simplify the logic involved with generating an action by adding an action creators for each of these action types:

```javascript
import C from './constants'

export const removeColor = id =>
    ({
        type: C.REMOVE_COLOR,
        id
    })

export const rateColor = (id, rating) =>
    ({
        type: C.RATE_COLOR,
        id,
        rating
    })
```

Now whenever we need to dispatch a `RATE_COLOR` or a `REMOVE_COLOR`, we can use the action creator and send the necessary data as function arguments:

```javascript
store.dispatch( removeColor("3315e1p5-3abl-0p523-30e4-8001l8yf2412") )
store.dispatch( rateColor("441e0p2-9ab4-0p523-30e4-8001l8yf2412", 5) )
```

Action creators simplify the task of dispatching actions; we only need to call a function and send it the necessary data. Action creators can abstract away details of how an action is created, which can greatly simplify the process of creating an action. For example, if we create an action called sortBy, it can decide the appropriate action to take:

```javascript
import C from './constants'

export const sortColors = sortedBy =>
    (sortedBy === "rating") ?
        ({
            type: C.SORT_COLORS,
            sortBy: "SORTED_BY_RATING"
        }) :
        (sortedBy === "title") ?
            ({
                type: C.SORT_COLORS,
                sortBy: "SORTED_BY_TITLE"
            }) :
            ({
                type: C.SORT_COLORS,
                sortBy: "SORTED_BY_DATE"
            })
```

The sortColors action creator checks sortedBy for "rating", "title", and the default. Now there is considerably less typing involved whenever you want to dispatch a sortColors action:

```javascript
store.dispatch( sortColors("title") )
```

Action creators can have logic. They also can help abstract away unnecessary details when creating an action. For example, take a look at the action for adding a color:

```json
{
     type: "ADD_COLOR",
     id: uuid.v4(),
     title: "Party Pink",
     color: "#F142FF",
     timestamp: new Date().toString()
}
```

So far, the IDs and timestamps have been generated when the actions are dispatched. Moving this logic into an action creator would abstract the details away from the process of dispatching actions:

```javascript
import C from './constants'
import { v4 } from 'uuid'

export const addColor = (title, color) =>
    ({
        type: C.ADD_COLOR,
        id: v4(),
        title,
        color,
        timestamp: new Date().toString()
    })
```

The addColor action creator will generate a unique ID and will provide a timestamp. Now it’s much easier to create new colors—we provide a unique ID by creating a variable that we can increment, and the timestamp is automatically set using the client’s present time:

```javascript
store.dispatch( addColor("#F142FF", "Party Pink") )
```

The really nice thing about action creators is that they provide a place to encapsulate all of the logic required to successfully create an action. The addColor action creator handles everything associated with adding new colors, including providing unique IDs and timestamping the action. It is all in one place, which makes debugging our application much easier.

**Action creators are where we should put any logic for communicating with backend APIs**. With an action creator, we can perform asynchronous logic like requesting data or making an API call.

## Difference between Redux and Flux

1. Redux only has one centralized store while flux has many
1. Redux doesn't need dispatcher
1. Redux store is lightweight
1. Redux: reducer describe how prev state + flux action to a next state.
1. Redux has a help library "react-redux"