import { applyMiddleware, createStore, DeepPartial } from 'redux';
import { apiMiddleware, ApiMiddleware } from 'redux-api-middleware';
import createSagaMiddleware from 'redux-saga';

import rootReducer, { State } from '../state';
import createLogger from './createLogger';

import SagaManager from 'sagas/SagaManager';

/**
 * Based on the current environment variable, we need to make sure
 * to exclude any DevTools-related code from the production builds.
 * The code is envify'd - using 'DefinePlugin' in Webpack.
 */
const __DEV__ = process.env.NODE_ENV !== 'production';

const sagaMiddleware = createSagaMiddleware();

const middlewareEnhancer = applyMiddleware(
  apiMiddleware as ApiMiddleware,
  sagaMiddleware,
  createLogger(),
);

const storeEnhancer = middlewareEnhancer;

/* TODO: typescript
if (__DEV__ && window.devToolsExtension) {
  // If the user has the "Redux DevTools" browser extension installed, use that.
  storeEnhancer = compose(middlewareEnhancer, window.devToolsExtension());
} */
export default function configureStore(initialState: DeepPartial<State> = {}) {
  const store = createStore(rootReducer, initialState, storeEnhancer);

  // run sagas
  SagaManager.startSagas(sagaMiddleware);

  if (__DEV__) {
    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
      module.hot.accept('../state', () =>
        store.replaceReducer(require('../state').default),
      );

      module.hot.accept('../sagas/SagaManager', () => {
        SagaManager.cancelSagas(store);
        require('../sagas/SagaManager').default.startSagas(sagaMiddleware);
      });
    }
  }

  return store;
}
