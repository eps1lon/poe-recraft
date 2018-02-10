import { all, fork, put, select, take } from 'redux-saga/effects';

import { combineLatest } from './util';
import { setGenerator, useGenerator, Type } from 'actions/craft';
import { buildGeneratorFactory } from 'selectors/generators';

function* initShowcase() {
  yield combineLatest(['POE/MODS_SUCCESS', 'POE/BENCH_SUCCESS'], function*() {
    yield put(useGenerator('showcase'));
  });
}

function* buildGenerators() {
  while (true) {
    const action = yield take(Type.USE_GENERATOR);

    const generator = yield select(buildGeneratorFactory(action.payload));

    yield put(setGenerator(generator));
  }
}

export default function* root() {
  yield all([fork(initShowcase), fork(buildGenerators)]);
}
