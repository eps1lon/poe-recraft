// @flow
import { all, fork, put, select } from 'redux-saga/effects';

import { combineLatest } from './util';
import { setGenerator } from '../actions/craft';
import { buildSowcase } from '../selectors/craft';

function* initShowcase(): Generator<*, *, *> {
  yield combineLatest(['POE/MODS_SUCCESS', 'POE/BENCH_SUCCESS'], function*() {
    const showcase = yield select(buildSowcase);

    yield put(setGenerator(showcase));
  });
}

export default function* root(): Generator<*, *, *> {
  yield all([fork(initShowcase)]);
}
