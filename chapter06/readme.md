# React Life Cycle Events

We've talked about how the Render method in a React component needs to be a pure function. That means it needs to be stateless, it needs to not make any Ajax requests, etc. It should just receive state and props and then render a UI.

Though we can't do those things in the render method, they're still pretty critical for building a React app. So now the question, where should those things go? To answer this question, we'll dive into React Life Cycle methods. Lifecycle methods are special methods each component can have that allow us to hook into the views when specific conditions happen (i.e. when the component first renders or when the component gets updated with new data, etc).

There are many different life cycle methods, but in this post we're going to explore the ones that are used most often (which will cover ~90% of use cases).

You can really break React's Life Cycle Methods down into two categories.

1. **When a component gets mounted to the DOM and unmounted.**
1. **When a component receives new data.**

## Mounting / Unmounting

In this section we're going to focus on those life cycle methods which are called when the component is initialized and added to the DOM (mounting), and when the component is removed from the DOM (unmounting). By definition then, these methods will be invoked only once during the life of the component.

For a moment I want you to step back and think about some items that may be important to do when a component mounts or unmounts.

Here are some things that we may need to do:

* Establish some default props in our component
* Set some initial state in our component
* Make an Ajax request to fetch some data needed for this component
* Set up any listeners (ie Websockets or Firebase listeners)
* Remove any listeners you initially set up (when unmounted)

### Establish some default props in our component:

Even if the consumer of our component doesn't pass in a certain prop, that prop still has a default value. We can do that with the defaultProps property.

```jsx
class Loading extends React.Component {
  render () {
    ...
  }
}
Loading.defaultProps = {
  text: 'Loading'
}
```

So if we had a Loading component that took in a loading text, we could make sure that if a `text` attribute isn't provided to the component, `this.props.text` will by default be 'Loading'.

### Set some initial state in our component

Sometimes you'll want your component to manage some piece of state. In order to do that you'll first need to set some initial state of your component when your component is first added to the DOM. To do this you can use ES6 constructor property.

```jsx
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state =  {
      email: '',
      password: ''
    }
  }
  render () {
    ...
  }
}
```

Above we've used a constructor to set an email and password property on our state object in our Login component. To update the state, you can call `this.setState` passing in a function which returns an object which overwrites one or both of the email and password properties.

### Make an Ajax request to fetch some data needed for this component

You can do this utilizing `componentDidMount`. This will get called right after the component is mounted to the DOM.

```jsx
class FriendsList extends React.Component {
  componentDidMount () {
    // ajax
    return axios.get(this.props.url).then(this.props.callback)
  }
  render () {
    ...
  }
}
```

Here we're using Axios to fetch some data then call a callback we received from props once that data is resolved.

### Set up any listeners (ie Websockets or Firebase listeners)

This is a perfect opportunity to use componentDidMount as well.

```jsx
class FriendsList extends React.Component {
  componentDidMount () {
    ref.on('value', function (snapshot) {
      this.setState(function () {
        return {
          friends: snapshot.val()
        }
      })
    }.bind(this)
  }
  render () {
    ...
  }
}
```

Now that we've set up that listener, we want to be sure to **remove it when the component is removed from the DOM so we don't have memory leaks.**

### Remove any listeners you initially set up (when unmounted)

That's where `componentWillUnmount` comes into play.

```jsx
class FriendsList extends React.Component {
  componentWillUnmount () {
    ref.off()
  }
  render () {
    ...
  }
}
```

## Other Life Cycle Events that are going to be called whenever the component receives new data from its parent component

`componentWillReceiveProps`: There will be times that you'll want to execute some code whenever your component receives new props. That's exactly what componentWillReceiveProps does.

The second is a more advanced case and is `shouldComponentUpdate`. React is very intelligent about not re-rendering unless something changed. You can make it even more intelligent by implementing shouldComponentUpdate. **shouldComponentUpdate returns a boolean, if that boolean is true, that component will re-render**. If it's false, that component (and naturally all child components), won't re-render. **This can be a huge performance gain if you know exactly when you want to re-render** (based on either the state or the props of your components).

![life cycle](http://om1o84p1p.bkt.clouddn.com/1494277419.png)