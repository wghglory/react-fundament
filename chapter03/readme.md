# Pure Functions. f(d)=view. Props and Nesting React Components.

One of the best parts of React.js is that your function is going to **take in some arguments and return some UI**.

Let's look at some actual code now.

```javascript
var getProfilePic = function (username) {
  return 'https://photo.fb.com/' + username
}
var getProfileLink = function (username) {
  return 'https://www.fb.com/' + username
}
var getProfileData = function (username) {
  return {
    pic: getProfilePic(username),
    link: getProfileLink(username)
  }
}
getProfileData('tylermcginnis')
```

What I want to do now is instead of having those functions return some value, let's return some UI (in the form of JSX). 

```jsx
class ProfilePic extends React.Component {
   render() {
     return (
       <img src={'https://photo.fb.com/' + this.props.username} />
     )
   }
})

class ProfileLink extends React.Component {
   render() {
     return (
       <a href={'https://www.fb.com/' + this.props.username}>
         {this.props.username}
       </a>
     )
   }
})

class Avatar extends React.Component {
   render() {
     return (
       <div>
         <ProfilePic username={this.props.username} />
         <ProfileLink username={this.props.username} />
       </div>
     )
   }
 })

<Avatar username="tylermcginnis" />
```

Now, instead of composing functions to get some value, we're composing functions to get some UI. This idea is so important in React that React 0.14 introduced **Stateless Functional Components which allows the code above to be written as normal functions**.

```javascript
var ProfilePic = function (props) {
  return <img src={'https://photo.fb.com/' + props.username} />
}
var ProfileLink = function (props) {
  return (
    <a href={'https://www.fb.com/' + props.username}>
      {props.username}
    </a>
  )
}
var Avatar = function (props) {
  return (
    <div>
      <ProfilePic username={props.username} />
      <ProfileLink username={props.username} />
    </div>
  )
}
  
<Avatar username="tylermcginnis" />
```

One thing each of the functions and components above has in common is they're all "pure functions".

The whole concept of a pure function is consistency and predictability.

**The reason for the consistency and predictability is because pure functions have the following characteristics.**

- **Pure functions always return the same result given the same arguments.**
- **Pure function's execution doesn't depend on the state of the application.**
- **Pure functions don't modify the variables and don't depend on variables outside of their scope.**

When you call a function that is "pure", you can predict exactly what's going to happen based on its input. This makes functions that are pure easy to reason about and testable.

Let's now look at two native JavaScript methods. .slice and .splice

```javascript
var friends = ['Ryan', 'Michael', 'Dan']
friends.slice(0, 1) // 'Ryan'
friends.slice(0, 1) // 'Ryan'
friends.slice(0, 1) // 'Ryan'
```

Notice `.slice` is a pure function. Given the same arguments, it will always return the same value. It's predictable.

Let's compare this to .slice's friend, .splice

```javascript
var friends = ['Ryan', 'Michael', 'Dan']
friends.splice(0, 1) // ["Ryan"]
friends.splice(0, 1) // ["Michael"]
friends.splice(0, 1) // ["Dan"]
```

`.splice` is not a pure function since each time we invoke it passing in the same arguments, we get a different result. It's also modifying state.

## Array, Object pure vs impure

```javascript
function addToArrayImpure(array, element) {
  array.push(element);
  return array;
}

function addToArrayPure(array, element) {
  return [...array, element];
  // return array.concat(element);
}

function addToObjImpure(obj, prop, value) {
  obj[prop] = value;
  return obj;
}

function addToObjPure(obj, prop, value) {
  return Object.assign({}, obj, {
    [prop]: value
  });
}

// ES7
function addToObjPureSpread(obj, prop, value) {
  return {
    ...obj,
    [prop]: value
  };
}

let person = { name: 'guanghui' };
console.log(addToObjPure(person, 'age', 20));
```

# Why does React use pure functions? 

The main reason is React's render method needs to be a pure function and because it's a pure function, all of the benefits of pure functions now apply to your UI as well. Another reason is that it's a good idea to get used to making your functions pure and pushing "side effects" to the boundaries of your program.

# [PropTypes](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)

```javascript
class Users extends React.Component {
  render() {
    return (
      <ul>
        {this.props.list.map(function (friend) {
          return <li>{friend}</li>
        })}
      </ul>
    )
  }
}
```

Looking at the component above, everything would break if we accidentally passed in a string like this: `<Users list="Tyler, Jake, Mikenzi" />`. Because we're calling `list.map` inside of our component and obviously strings don't have a `.map` method. This is where `PropTypes` come into play. 

**PropTypes allow you to declare the "type" (string, number, function, etc) of each prop being passed to a component, also it can make a property required or type checking specific properties of an object**. Then, if a prop passed in isn't of the declared type, you'll get a warning in the console.

```jsx
var React = require('react');
var PropTypes = require('prop-types')
class Users extends React.Component {
  render() {
    return (
      <ul>
        {this.props.list.map(function (friend) {
          return <li>{friend}</li>
        })}
      </ul>
    )
  }
}
Users.propTypes = {
  list: PropTypes.array.isRequired
}
```

In order to use PropTypes, you'll need to `npm install prop-types`. 

> Note: They used to be included with React, but as of React 15.5 they were made they're own package which can be downloaded from npm as prop-types.

PropTypes are great for finding bugs in your components but what I like most about them is their ability to add documentation to a component. When I look at a well written component, **I can look at the render method to figure out what it's going to look like and I can look at its propTypes to figure out what it needs to accept to render properly**.

A few things to note that you won't be expecting with the API.

To use PropTypes with functions the API is **PropTypes.func** rather than **PropTypes.function**. Also to use booleans, the API is **PropTypes.bool** not **PropTypes.boolean**. I'm not 100% sure why but I assume it's because with ES6 you can use named imports to do

`var { array, object, number, function, boolean } = React.PropTypes`
and both function and boolean are reserved words so that would break. Instead use func and bool and you'd be good.
