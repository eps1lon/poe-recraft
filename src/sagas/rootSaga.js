import { all, fork } from 'redux-saga/effects';

import craft from './craft';

export default function* rootSaga() {
  yield all([fork(craft)]);
}
