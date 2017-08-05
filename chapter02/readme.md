# React passing data by props

React passes data from one component to another child component and that system is through props. **props are to components what arguments are to functions.**

```jsx
class HelloUser extends React.Component {
  render() {
    return (
      <div>Hello, {this.props.name}</div>
    )
  }
}
ReactDOM.render(<HelloUser name="Guanghui"/>, document.getElementById('app'));
```

Notice when we use the component, we're passing in a name attribute. This attribute can then be accessed inside the component as `this.props.name`.

## 3 Prop example

```jsx
class Badge extends React.Component {
  render() {
    return (
      <div>
        <img src={this.props.img} />
        <h1>Name: {this.props.name}</h1>
        <h3>username: {this.props.username}</h3>
      </div>
    )
  }
}

ReactDOM.render(
  <Badge
    name='Tyler McGinnis'
    username='tylermcginnis'
    img='https://avatars0.githubusercontent.com/u/2933430?v=3&s=460'/>,
  document.getElementById('app')
);
```

```jsx
var USER_DATA = {
  name: 'Tyler McGinnis',
  img: 'https://avatars0.githubusercontent.com/u/2933430?v=3&s=460',
  username: 'tylermcginnis'
}

class Badge extends React.Component {
  render() {
    return (
      <div>
        <img src={this.props.user.img} />
        <h1>Name: {this.props.user.name}</h1>
        <h3>username: {this.props.user.username}</h3>
      </div>
    )
  }
}

ReactDOM.render(
  <Badge user={USER_DATA}/>,
  document.getElementById('app')
);
```

```jsx
class Avatar extends React.Component {
  render() {
    return (
      <img src={this.props.img} />
    )
  }
}

class Label extends React.Component {
  render() {
    return (
      <h1>Name: {this.props.name}</h1>
    )
  }
}

class ScreenName extends React.Component {
  render() {
    return (
      <h3>Username: {this.props.username}</h3>
    )
  }
}

class Badge extends React.Component {
  render() {
    return (
      <div>
        <Avatar img={this.props.user.img}/>
        <Label name={this.props.user.name}/>
        <ScreenName username={this.props.user.username}/>
      </div>
    )
  }
}

ReactDOM.render(
  <Badge user={{
    name: 'Tyler McGinnis',
    img: 'https://avatars0.githubusercontent.com/u/2933430?v=3&s=460',
    username: 'tylermcginnis'
  }} />,
  document.getElementById('app')
);
```

## Creating lists in React with map and filter

map is a property on every Array in JavaScript and allows you to "map" over an array, and returns you a new array with some other updates, like adding 10. Original array is not changed.

```jsx
// parent component
class FriendsContainer extends React.Component {
  render() {
    var name = 'Tyler McGinnis';
    var friends = ['Ean Platter', 'Murphy Randall', 'Merrick Christensen'];
    return (
      <div>
        <h3> Name: {name} </h3>
        <ShowList names={friends} />
      </div>
    )
  }
}
```

```jsx
// child component
class ShowList extends React.Component {
  render() {
    return (
      <div>
        <h3> Friends </h3>
        <ul>
          {this.props.names.map(friend =>
            (<li> {friend} </li>);
          )}
        </ul>
      </div>
    )
  }
}
```

filter does almost same thing as map, but filter allows you to **filter out certain items** in an array. For example, let's say we only wanted to have friends whose name started with 'E'.

```javascript
var friends = ['Ean', 'Tyler', 'Mikenzi', 'Eric', 'Jessica'];
var newFriends = friends.filter(function (friend) {
  return friend[0] === 'E'
});
console.log(newFriends) // ['Ean', 'Eric']
```

## 2 Loop example

```jsx
class Users extends React.Component {
  render() {
    return (
      <ul>
        {this.props.list.map(name=>
          <li>{name}</li>
        )}
        {this.props.list.map(function(name){
          return <li>{name}</li>
        })}
      </ul>
    )
  }
}

ReactDOM.render(
  <Users list={['Tyler', 'Mikenzi', 'Ryan', 'Michael']} />,
  document.getElementById('app')
);
```

```jsx
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import './index.css'

class Users extends React.Component {
  render() {
    let friends = this.props.list.filter(ele => ele.friend === true);
    let nonFriends = this.props.list.filter(ele => ele.friend !== true);

    return (
      <div>
        <h1>Friends</h1>
        <ul>
          {friends.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>

        <hr />

        <h1>Non Friends</h1>
        <ul>
          {nonFriends.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
      </div>
    )
  }
}

ReactDOM.render(
  <Users list={[
    { id: 1, name: 'Tyler', friend: true },
    { id: 2, name: 'Ryan', friend: true },
    { id: 3, name: 'Michael', friend: false },
    { id: 4, name: 'Mikenzi', friend: false },
    { id: 5, name: 'Jessica', friend: true },
    { id: 6, name: 'Dan', friend: false }]}
  />,
  document.getElementById('app')
);
```