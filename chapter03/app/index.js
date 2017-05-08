let React = require('react');
let ReactDOM = require('react-dom')
let PropTypes = require('prop-types')

/*class Users extends React.Component {
  render() {
    return (
      <ul>
        {this.props.list.map(function (friend, index) {
          return <li key={index}>{friend}</li>
        })}
      </ul>
    )
  }
}
Users.propTypes = {
  list: PropTypes.array.isRequired
}

ReactDOM.render(
  // <Users list="fhdasf,fdasf" />,
  <Users list={['Ean Platter', 'Murphy Randall', 'Merrick Christensen']} />,
  document.getElementById('app')
);*/


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

Users.propTypes = {
  // list: PropTypes.array.isRequired
  // list: PropTypes.arrayOf(PropTypes.object),
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    friend: PropTypes.bool.isRequired,
  }))
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