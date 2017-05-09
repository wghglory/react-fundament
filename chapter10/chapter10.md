What We're going to in this article.

1. add methods in api.js
2. extract reusable PlayerPreview component
3. update Battle.js and use PlayerPreview
4. click battle, render result component

# javascript array.reduce

We ofen need to take a list of things and convert that into just one item - whether an integer, an object, or another array.

```javascript
var scores = [89, 76, 47, 95]
var initialValue = 0
var reducer = function (accumulator, item) {
  return accumulator + item
}
var total = scores.reduce(reducer, initialValue)
var average = total / scores.length
```

You'll notice .reduce takes in two values, a callback function and an initial value. The callback (reducer) function has two parameters. 

The very first time the reducer function is called, it's going to be passed the initialValue you gave it (the 2nd argument to .reduce) and the first item in the actual array. So in our example above the first time that our reducer function runs, accumulator is going to be 0 and item is going to be 89. Remember, the goal is to transform an array into a single value. We currently have two numbers, 0 and 89, and are goal is to get that to one value. Because we're wanting to find the sum of every item in the array, we'll add 89 + 0 to get 89. That brings up a very important step. The thing that gets returned from the reducer function will then be passed as the accumulator the next time the function runs. So when reducer runs again, accumulator will be 89 and item will now be the second item in the array, 76. This pattern continues until we have no more items in the array and we get the summation of all of our reducer functions, which is 307.

.reduce can be used for more than transforming an array of numbers. It's all about that initialValue that you pass to reduce. **If you want the end result to be an object (therefore converting an array into an object), have the initialValue be an object and add properties to that object as you go**.

Here's an example of how you would do that below. You have an array of foods and you want to transform that to an object whose keys are the food itself and whose values are how many votes that food received.

```javascript
var votes = [
  'tacos',
  'pizza',
  'pizza',
  'tacos',
  'fries',
  'ice cream',
  'ice cream',
  'pizza'
];
var initialValue = {}
var reducer = function(tally, vote) {
  if (!tally[vote]) {
    tally[vote] = 1;
  } else {
    tally[vote] = tally[vote] + 1;
  }
  return tally;
}
var result = votes.reduce(reducer, initialValue) // {tacos: 2, pizza: 3, fries: 1, ice cream: 2}
```

In our api.js, getStarCount will sum up each repo's star:

```jsx
function getStarCount(repos) {
  return repos.data.reduce(function (count, repo) {
    return count + repo.stargazers_count
  }, 0);
}
```

# Composition vs props.children

```jsx
<Clock>
  12:49 AM
</Clock>
```

Now with the implementation of our Clock component, we'll need somehow to access 12:49 AM or whatever is between the opening and closing element in order to update it. React gives us an easy way to do this and that is via `this.props.children`. In this case this.props.children will evaluate to 12:49 AM.

That's great, but what if our component is a little more complex?

```jsx
<Clock>
  <Time />
  <Period />
</Clock>
```

Now, `this.props.children` is an array of components rather than just a single component, since there are multiple components nested. So again, props.children in a component is just whatever is between the `<Opening>` and closing `</Opening>` blocks of a component.

> In our example, props.children PlayerPreview in Battle.js is a reset button while in Result.js is ul list.

## Extract reusable component

PlayerPreview.js is reusable. `{props.children}` will display `<PlayerPreview>anything equals props.children</PlayerPreview>`

```jsx
const React = require('react');
const PropTypes = require('prop-types');

function PlayerPreview(props) {
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={'Avatar for ' + props.username}
        />
        <h2 className='username'>@{props.username}</h2>
      </div>
      {props.children}
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

module.exports = PlayerPreview;
```

Battle.js: Notice PlayerPreview has Button inside, which will be rendering  in `props.children`. Before battle click, render PlayerInput, while after clicking submit, render PlayerPreview and show user profile.

```jsx
...
const PlayerPreview = require('./PlayerPreview');

class Battle extends React.Component {
  ...
  render() {
    ...
    return (
      <div>
        <div className='row'>
          {!playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />}

          {playerOneImage !== null &&
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}>
              <button
                className='reset'
                onClick={this.handleReset.bind(this, 'playerOne')}>
                Reset
              </button>
            </PlayerPreview>}

          {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />}

          {playerTwoImage !== null &&
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}>
              <button
                className='reset'
                onClick={this.handleReset.bind(this, 'playerTwo')}>
                Reset
              </button>
            </PlayerPreview>}
        </div>

        {playerOneImage && playerTwoImage &&
          <Link
            className='button'
            to={{
              pathname: match.url + '/result',
              search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
            }}>
            Battle
          </Link>}
      </div>
    )
  }
}

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const value = event.target.value;

    // this.setState(function () {
    //   return {
    //     username: value
    //   }
    // });

    this.setState({ username: value });
  }
  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }
  render() {
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">{this.props.label}</label>
        <input
          id="username"
          placeholder="github username"
          type="text"
          value={this.state.username}
          autoComplete="off"
          onChange={this.handleChange}
        />
        <button
          className="button"
          type="submit"
          disabled={!this.state.username}>
          Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

PlayerInput.defaultProps = {
  label: 'Username',
}

module.exports = Battle;
```

Result.js

```jsx
let React = require('react');
let PropTypes = require('prop-types');
let queryString = require('query-string');
let api = require('../utils/api');
let Link = require('react-router-dom').Link;
let PlayerPreview = require('./PlayerPreview');

function Profile(props) {
  let info = props.info;

  return (
    <PlayerPreview username={info.login} avatar={info.avatar_url}>
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

function Player(props) {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{ textAlign: 'center' }}>Score: {props.score}</h3>
      <Profile info={props.profile} />
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
}

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    }
  }
  componentDidMount() {
    let players = queryString.parse(this.props.location.search);

    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(function (players) {
      if (players === null) { //error: api handleError returns null
        return this.setState(function () {
          return {
            error: 'Looks like there was an error. Check that both users exist on Github.',
            loading: false,
          }
        });
      }

      this.setState(function () {
        return {
          error: null,
          winner: players[0],
          loser: players[1],
          loading: false,
        }
      });
    }.bind(this));
  }
  render() {
    let error = this.state.error;
    let winner = this.state.winner;
    let loser = this.state.loser;
    let loading = this.state.loading;

    if (loading === true) {
      return <p>Loading!</p>
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}

module.exports = Result;
```