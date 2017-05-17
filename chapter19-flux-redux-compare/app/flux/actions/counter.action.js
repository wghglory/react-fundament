import dispatcher from '../dispatcher';
import * as ACT from '../constants/counter.actionTypes';

export function incrementCount() {
  dispatcher.dispatch({ type: ACT.INCREMENT, payload: null });
}