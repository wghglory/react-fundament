import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Users extends Component {
  render() {
    const friends = this.props.list.filter(ele => ele.friend === true);
    const nonFriends = this.props.list.filter(ele => ele.friend !== true);

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

