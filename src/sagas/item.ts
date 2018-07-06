import { all, fork, put, select, take } from 'redux-saga/effects';

import { baseitem_filter_actions } from 'state/baseitemfilter';
import { item_actions, item_selectors } from 'state/item';
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
    yield take(baseitem_filter_actions.Types.SET_ITEM_CLASS);
    yield setDefaultItem();
  }
}

export default function* root() {
  yield all([fork(initDefaultItem)]);
}
