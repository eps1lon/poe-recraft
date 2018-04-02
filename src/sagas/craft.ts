import { all, fork, put, select, take } from 'redux-saga/effects';

import { combineLatest } from './util';
import { craftActions } from 'state/craft';
import { poe_selectors, poe_actions } from 'state/poe';

function* initShowcase() {
  yield combineLatest(
    [poe_actions.Type.MODS_SUCCESS, poe_actions.Type.BENCHS_SUCCESS],
    function*() {
      yield put(craftActions.useGenerator('showcase'));
    }
  );
}

function* buildGenerators() {
  while (true) {
    const action = yield take(craftActions.Type.USE_GENERATOR);

    const generator = yield select(
      poe_selectors.generators.buildGeneratorFactory(action.payload)
    );

    yield put(craftActions.setGenerator(generator));
  }
}

export default function* root() {
  yield all([fork(initShowcase), fork(buildGenerators)]);
}
