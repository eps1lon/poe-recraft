import { all, fork, put, select, take } from 'redux-saga/effects';

import { combineLatest } from './util';
import { setItemClass } from 'actions/baseitemfilter';
import { setItem } from 'actions/item';
import { defaultItem } from 'selectors/item';

function* setDefaultItem() {
  const item = yield select(defaultItem);

  yield put(setItem(item));
}

function* initDefaultItem() {
  // first init
  const combine_actions = ['POE/ITEMS_SUCCESS'];

  yield combineLatest(combine_actions, setDefaultItem, { break_out: true });

  // set again on class change
  while (true) {
    yield take(setItemClass.toString());
    yield setDefaultItem();
  }
}

export default function* root() {
  yield all([fork(initDefaultItem)]);
}
