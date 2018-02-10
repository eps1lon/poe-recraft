// Borrowed from https://gist.github.com/hoschi/6538249ad079116840825e20c48f1690
// Note that reloading sagas has several issues/caveats to be aware of.
// See https://github.com/yelouafi/redux-saga/issues/22#issuecomment-218737951 for discussion.
import { SagaMiddleware } from 'redux-saga';
import { take, fork, cancel } from 'redux-saga/effects';

import { Store } from 'store/configureStore';
import rootSaga from './rootSaga';

const sagas = [rootSaga];

export const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';

function createAbortableSaga(saga: (...args: any[]) => any) {
  if (process.env.NODE_ENV === 'development') {
    return function* main() {
      const sagaTask = yield fork(saga);

      yield take(CANCEL_SAGAS_HMR);
      yield cancel(sagaTask);
    };
  } else {
    return saga;
  }
}

const SagaManager = {
  startSagas(sagaMiddleware: SagaMiddleware<{}>) {
    sagas.map(createAbortableSaga).forEach(saga => sagaMiddleware.run(saga));
  },

  cancelSagas(store: Store) {
    store.dispatch({
      type: CANCEL_SAGAS_HMR
    });
  }
};

export default SagaManager;
