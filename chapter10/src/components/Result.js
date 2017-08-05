// http://localhost:8083/battle/result?playerOneName=wghglory&playerTwoName=ryanflorence
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import {battle} from '../utils/api';
import PlayerPreview from './PlayerPreview';

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
        {info.blog && <li>
          <a href={info.blog}>{info.blog}</a>
        </li>}
      </ul>
    </PlayerPreview>
  );
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
};

function Player(props) {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{
        textAlign: 'center'
      }}>Score: {props.score}</h3>
      <Profile info={props.profile}/>
    </div>
  );
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
};

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    };
  }
  componentDidMount() {
    let players = queryString.parse(this.props.location.search);
    console.log(this.props.location.search);  //?playerOneName=wghglory&playerTwoName=ff
    console.log(players);  //{playerOneName: "wghglory", playerTwoName: "ff"}

    battle([players.playerOneName, players.playerTwoName]).then(function (players) {
      if (players === null) { //error: api handleError returns null
        return this.setState(function () {
          return {error: 'Looks like there was an error. Check that both users exist on Github.', loading: false};
        });
      }

      this.setState(function () {
        return {error: null, winner: players[0], loser: players[1], loading: false};
      });
    }.bind(this));
  }

  render() {
    let error = this.state.error;
    let winner = this.state.winner;
    let loser = this.state.loser;
    let loading = this.state.loading;

    if (loading === true) {
      return <p>Loading!</p>;
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      );
    }

    return (
      <div className='row'>
        <Player label='Winner' score={winner.score} profile={winner.profile}/>
        <Player label='Loser' score={loser.score} profile={loser.profile}/>
      </div>
    );
  }
}

export default Result;