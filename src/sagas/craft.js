// @flow
import { all, fork, put, select, take } from 'redux-saga/effects';

import { setGenerator } from '../actions/craft';
import { buildSowcase } from '../selectors/craft';

function* initShowcase(): Generator<*, *, *> {
  const combine = ['POE/MODS_SUCCESS', 'POE/BENCH_SUCCESS'];
  const actions = new Set();

  while (true) {
    const action = yield take(combine);

    actions.add(action);

    if (actions.size === combine.length) {
      const showcase = yield select(buildSowcase);

      yield put(setGenerator(showcase));
    }
  }
}

export default function* root(): Generator<*, *, *> {
  yield all([fork(initShowcase)]);
}
