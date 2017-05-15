/**
 * action directly talks with dispatcher (tells it what action you need to notify store, and pass data)
 */

import dispatcher from '../dispatcher';
import * as ACT from '../constants';
// import { ajax } from '../../utils/ajax';

export function initTasks() {
  dispatcher.dispatch({ type: ACT.INIT_TASKS, payload: null });

  // ajax({
  //   url: 'api/task',
  //   method: 'get',
  //   fnSuccess: (tasks) => {
  //     dispatcher.dispatch({ type: ACT.INIT_TASKS, payload: tasks });
  //   }
  // });
}

export function addTask(packt) {
  addTaskSync(packt);

  // ajax({
  //   url: 'api/task',
  //   data: packt,
  //   successHook: (task) => {
  //     addTaskSync(task);
  //   }
  // });
}


export function addTaskSync(packt) {
  // transform data if needed
  dispatcher.dispatch({ type: ACT.ADD_TASK, payload: packt });
}

export function removeTask(packt) {
  dispatcher.dispatch({ type: ACT.REMOVE_TASK, payload: packt });

  // ajax({
  //   url: `api/task/${packt._id}`,
  //   method: 'delete',
  //   successHook: ({ removed }) => {
  //     removed && dispatcher.dispatch({ type: ACT.REMOVE_TASK, payload: packt });
  //   }
  // });
}