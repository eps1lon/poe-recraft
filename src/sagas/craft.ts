import { all, fork, put, select, take } from 'redux-saga/effects';

import { craft_actions, poe_actions } from 'state/actions';
import { poe_selectors } from 'state/selectors';
import { combineLatest } from './util';

function* initShowcase() {
  yield combineLatest(
    [poe_actions.Type.MODS_SUCCESS, poe_actions.Type.BENCHS_SUCCESS],
    function*() {
      yield put(craft_actions.useGenerator('showcase'));
    }
  );
}

function* buildGenerators() {
  while (true) {
    const action = yield take(craft_actions.Type.USE_GENERATOR);

    const generator = yield select(
      poe_selectors.generators.buildGeneratorFactory(action.payload)
    );

    yield put(craft_actions.setGenerator(generator));
  }
}

export default function* root() {
  yield all([fork(initShowcase), fork(buildGenerators)]);
}
