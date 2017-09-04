import { all, fork } from 'redux-saga/effects';

import craft from './craft';
import item from './item';

export default function* rootSaga() {
  yield all([fork(craft), fork(item)]);
}
