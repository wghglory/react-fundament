/**
 * includes both action and store
 * action: click event calls relative action 
 * store: bind to react state
 */
import React from 'react';
import Task from './task';
import Button from '../bootstrap/Button';
import taskStore from '../flux/stores/tasks.client.store';
import { addTask } from '../flux/actions/tasks.client.action';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: taskStore.getTasks()
    };

    this.addNewTask = this.addNewTask.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    this.setState({ tasks: taskStore.getTasks() });
  }

  // after each action, store should emit an event, here react setState and get latest data from store
  componentDidMount() {
    taskStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    // taskStore.removeListener('change', this.getData.bind(this));   //this doesn't work, why?
    taskStore.removeChangeListener(this._onChange);
  }

  addNewTask() {
    const tasks = this.state.tasks.slice(0);
    /*
    1. call action with data. 
    2. action sends ajax post request to db, in callback dispatcher sends actionType, data to store
    3. store manages data internally, emit 'change' event
    4. Then 'change' event is triggered
    5. componentDidMount listens that event, and setState according to store
    */
    addTask({ label: this.input.value, _id: tasks.length });
  }

  render() {
    const { tasks } = this.state;
    let taskArr = [];

    for (let { _id, label } of tasks) {
      taskArr.push(<Task key={_id} id={_id}>{label}</Task>);
    }

    return (
      <div>
        <div className="addTask">
          <input className="form-control" ref={(a) => { this.input = a; }} type="text" />
          <Button className="-secondary" onClick={this.addNewTask}>Add Task</Button>
        </div>
        {taskArr}
      </div>
    );
  }
}