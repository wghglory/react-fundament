import '../bootstrap/jumbotron.scss';

import React from 'react';
import {Link} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group'; //https://reactcommunity.org/react-transition-group/


const FadeTransition = (props) => (<CSSTransition {...props} classNames="animation" timeout={{
  enter: 500,
  exit: 300
}}/>);

export default class Home extends React.Component {
  render() {
    /* return (
      <div className="home-container jumbotron">
        <h1 className="animation">Github Battle: Battle your friends. h1: native css3 animation; button: react-transition-group.</h1>
        <TransitionGroup>
          <CSSTransition classNames="animation" timeout={{
            enter: 2000,
            exit: 500
          }}>
            <Link className="button" to="/battle">Battle</Link>
          </CSSTransition>
        </TransitionGroup>
      </div>
    ); */
    return (
      <div className="home-container jumbotron">
        <h1 className="animation">Github Battle: Battle your friends. h1: native css3 animation; button: react-transition-group.</h1>
        <TransitionGroup>
          <FadeTransition>
            <Link className="button" to="/battle">Battle</Link>
          </FadeTransition>
        </TransitionGroup>
      </div>
    );
  }
}