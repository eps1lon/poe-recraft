// @flow
import { all, fork, put, select, take } from 'redux-saga/effects';

import { combineLatest } from './util';
import { setItem, setItemClass } from 'actions/item';
import { defaultItem } from 'selectors/item';

function* setDefaultItem() {
  const item = yield select(defaultItem);

  yield put(setItem(item));
}

function* initDefaultItem(): Generator<*, *, *> {
  // first init
  const combine_actions = ['POE/ITEMS_SUCCESS'];

  yield combineLatest(combine_actions, setDefaultItem, { break_out: true });

  // set again on class change
  while (true) {
    yield take(setItemClass.toString());
    yield setDefaultItem();
  }
}

export default function* root(): Generator<*, *, *> {
  yield all([fork(initDefaultItem)]);
}
