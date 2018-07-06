import { SagaIterator } from 'redux-saga';
import { take } from 'redux-saga/effects';

interface CombineLatestOptions {
  break_out: boolean;
}
// shameless plug from redux-saga-combine-latest
// which requires a polyfill though
export function* combineLatest(
  actionTypes: string[],
  saga: (...args: any[]) => SagaIterator,
  options: Partial<CombineLatestOptions> = {}
) {
  const { break_out = false } = options;
  const actions: { [key: string]: any } = {};

  const invariant: typeof pendingActions = break_out
    ? pendingActions
    : () => true;

  while (invariant(actions, actionTypes)) {
    const action = yield take(actionTypes);
    actions[action.type] = action;

    if (!pendingActions(actions, actionTypes)) {
      yield saga(actionTypes.map(t => actions[t]));
    }
  }
}

function pendingActions(
  actions: { [key: string]: any },
  actionTypes: string[]
) {
  return Object.keys(actions).length < actionTypes.length;
}
