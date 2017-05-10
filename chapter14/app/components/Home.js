const React = require('react');
const Link = require('react-router-dom').Link;

export default class Home extends React.Component {
  render() {
    return (
      <div className="home-container jumbotron">
        <h1>Github Battle: Battle your friends ... and stuff.</h1>
        <Link className="button" to="/battle">Battle</Link>
      </div>
    );
  }
}