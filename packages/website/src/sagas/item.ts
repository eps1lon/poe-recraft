import { all, fork, put, select, take } from 'redux-saga/effects';

import { baseitemfilter_actions, item_actions } from 'state/actions';
import { item_selectors } from 'state/selectors';
import { combineLatest } from './util';

function* setDefaultItem() {
  const item = yield select(item_selectors.defaultItem);

  yield put(item_actions.setItem(item));
}

function* initDefaultItem() {
  // first init
  const combine_actions = ['POE/ITEMS_SUCCESS'];

  yield combineLatest(combine_actions, setDefaultItem, { break_out: true });

  // set again on class change
  while (true) {
    yield take(baseitemfilter_actions.Types.SET_ITEM_CLASS);
    yield setDefaultItem();
  }
}

export default function* root() {
  yield all([fork(initDefaultItem)]);
}
