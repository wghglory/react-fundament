import React from 'react';
import {Link, NavLink} from 'react-router-dom';

export default class Home extends React.Component {
  render() {
    return (
      <div className="home-container">
        <h1>Github Battle: Battle your friends ... and stuff.</h1>
        <Link className="button" to="/battle">Battle</Link>
      </div>
    );
  }
}