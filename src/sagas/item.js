// @flow
import { all, fork, put, select, take } from 'redux-saga/effects';

import { combineLatest } from './util';
import { setItem } from '../actions/item';
import { defaultItem } from '../selectors/item';

function* setDefaultItem() {
  const item = yield select(defaultItem);

  yield put(setItem(item));
}

function* initDefaultItem(): Generator<*, *, *> {
  // first init
  const combine_actions = ['POE/META_DATA_SUCCESS', 'POE/ITEMS_SUCCESS'];

  yield combineLatest(combine_actions, setDefaultItem, { break_out: true });

  // set again on class change
  while (true) {
    yield take('SET_ITEM_CLASS');
    yield setDefaultItem();
  }
}

export default function* root(): Generator<*, *, *> {
  yield all([fork(initDefaultItem)]);
}
