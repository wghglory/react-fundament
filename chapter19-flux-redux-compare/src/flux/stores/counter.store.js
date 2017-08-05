/**
 * place to store data, and then bind to react state
 * 1. action sends action and data to dispatcher, 
 * 2. dispatcher registers store's data operation command
 * 3. store operates its data center based on the action and data from action and dispatcher
 */

import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import * as ACT from '../constants/counter.actionTypes';

class CounterStore extends EventEmitter {
  constructor() {
    super();

    this.count = 0;

    this.operate = this.operate.bind(this);
  }

  addChangeListener(cb) {    
    this.on('change', cb);
  }

  removeChangeListener(cb) {
    this.on('change', cb);
  }

  getcount() {
    return this.count;  
  }

  incrementCount(payload) {
    this.count = this.count + 1;
    this.emit('change');
  }

  operate({ type, payload }) {
    switch (type) {
      case ACT.INCREMENT:
        this.incrementCount(payload);
        break;
      default:
        break;
    }
  }

}

const store = new CounterStore();

dispatcher.register(store.operate);

export default store;