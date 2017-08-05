import React from 'react';

/*// react state
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { count: 0 };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.clickHandler}>click</button>
      </div>
    );
  }
}*/


/*// flux
import CounterStore from '../flux/stores/counter.store';
import { incrementCount } from '../flux/actions/counter.action';
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { count: CounterStore.getcount() };

    this.clickHandler = this.clickHandler.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    this.setState({ count: CounterStore.getcount() })
  }

  componentDidMount() {
    CounterStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    CounterStore.removeChangeListener(this._onChange);
  }

  clickHandler() {
    incrementCount();
  }
  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.clickHandler}>click</button>
      </div>
    );
  }
}*/


// redux
import * as ACT from '../redux/constants/counter.actionTypes';
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { count: this.props.store.getState() };

    this.clickHandler = this.clickHandler.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    this.setState({ count: this.props.store.getState() });
  }

  componentDidMount() {
    // 被订阅的callback方法会在dispatch通过reducer计算出新state后执行
    this.props.store.subscribe(this._onChange);
  }

  clickHandler() {
    this.props.store.dispatch({ type: ACT.INCREMENT, payload: null });
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.clickHandler}>click</button>
      </div>
    );
  }
}


// // redux
// import CountContainer from './CountContainer';
// export default class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <CountContainer store={this.props.store} />
//       </div>
//     );
//   }
// }
