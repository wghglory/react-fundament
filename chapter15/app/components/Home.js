const React = require('react');
const Link = require('react-router-dom').Link;
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import '../bootstrap/jumbotron.scss';

export default class Home extends React.Component {
  render() {
    return (
      <div className="home-container jumbotron">
        <h1 className="animation">Github Battle: Battle your friends. h1: native css3 animation; button: react-transition-group.</h1>
        <CSSTransitionGroup transitionName="animation" transitionAppear={true} transitionAppearTimeout={2000}
          transitionEnterTimeout={2000} transitionLeaveTimeout={500}>
          <Link className="button" to="/battle">Battle</Link>
        </CSSTransitionGroup>
      </div>
    );
  }
}