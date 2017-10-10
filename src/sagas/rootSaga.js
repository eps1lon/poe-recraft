import { all, fork } from 'redux-saga/effects';

import craft from './craft';
import i18n from './i18n';
import item from './item';

export default function* rootSaga() {
  yield all([fork(craft), fork(i18n), fork(item)]);
}
