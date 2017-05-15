/**
 * action directly talks with dispatcher (tells it what action you need to notify store, and pass data)
 */

import dispatcher from '../dispatcher';
import * as ACT from '../constants';
import { ajax } from '../../utils/ajax';

export function initTasks() {
  ajax({
    url: 'api/task',
    method: 'get',
    fnSuccess: (tasks) => {
      dispatcher.dispatch({ type: ACT.INIT_TASKS, payload: tasks });
    }
  });
}

export function addTask(packt) {
  // packt: {label: "a new task"}
  if (packt.label === '') {
    return;
  }

  ajax({
    url: 'api/task',
    method: 'post',
    data: packt,
    fnSuccess: (task) => {
      // task is mongodb object
      dispatcher.dispatch({ type: ACT.ADD_TASK, payload: task });
    }
  });
}

export function removeTask(packt) {
  ajax({
    url: `api/task/${packt._id}`,
    method: 'delete',
    fnSuccess: ({ removed }) => {
      removed && dispatcher.dispatch({ type: ACT.REMOVE_TASK, payload: packt });
    }
  });
}