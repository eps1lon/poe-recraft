import { take } from 'redux-saga/effects';

// shameless plug from redux-saga-combine-latest
// which requires a polyfill though
export function* combineLatest(actionTypes, saga, { break_out = false } = {}) {
  let actions = {};

  const invariant = break_out ? pendingActions : () => true;

  while (invariant(actions, actionTypes)) {
    const action = yield take(actionTypes);
    actions[action.type] = action;

    if (!pendingActions(actions, actionTypes))
      yield saga(actionTypes.map(t => actions[t]));
  }
}

function pendingActions(actions, actionTypes) {
  return Object.keys(actions).length < actionTypes.length;
}
