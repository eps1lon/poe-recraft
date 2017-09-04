// @flow
import { all, fork, put, select } from 'redux-saga/effects';

import { combineLatest } from './util';
import { setItem } from '../actions/item';
import { defaultItem } from '../selectors/item';

function* initDefaultItem(): Generator<*, *, *> {
  yield combineLatest(
    ['POE/META_DATA_SUCCESS', 'POE/ITEMS_SUCCESS'],
    function*() {
      const item = yield select(defaultItem);

      yield put(setItem(item));
    }
  );
}

export default function* root(): Generator<*, *, *> {
  yield all([fork(initDefaultItem)]);
}
