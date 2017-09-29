// @flow
import { all, fork, put, select, take } from 'redux-saga/effects';

import { combineLatest } from './util';
import { setGenerator, useGenerator } from '../actions/craft';
import { buildShowcase, buildGeneratorFactory } from '../selectors/generators';

function* initShowcase(): Generator<*, *, *> {
  yield combineLatest(['POE/MODS_SUCCESS', 'POE/BENCH_SUCCESS'], function*() {
    const showcase = yield select(buildShowcase);

    yield put(setGenerator(showcase));
  });
}

function* buildGenerators(): Generator<*, *, *> {
  while (true) {
    const action = yield take(useGenerator.toString());

    const generator = yield select(buildGeneratorFactory(action.payload));

    yield put(setGenerator(generator));
  }
}

export default function* root(): Generator<*, *, *> {
  yield all([fork(initShowcase), fork(buildGenerators)]);
}
