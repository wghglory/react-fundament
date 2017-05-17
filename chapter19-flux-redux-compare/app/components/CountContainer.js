import React from 'react';
import CountWidget from './CountWidget';
import * as ACT from '../redux/constants/counter.actionTypes';

export default class CountContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: this.props.store.getState()
    };

    this.clickHandler = this.clickHandler.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    this.setState({ count: this.props.store.getState() });
  }

  componentDidMount() {
    this.props.store.subscribe(this._onChange);
  }

  clickHandler() {
    this.props.store.dispatch({ type: ACT.INCREMENT, payload: null });
  }

  render() {
    return (
      <div>
        <CountWidget count={this.state.count} clickHandler={this.clickHandler} />
      </div>
    );
  }
}
