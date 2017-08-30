import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers/rootReducer';

import SagaManager from '../sagas/SagaManager';

/**
 * Based on the current environment variable, we need to make sure
 * to exclude any DevTools-related code from the production builds.
 * The code is envify'd - using 'DefinePlugin' in Webpack.
 */
const __DEV__ = process.env.NODE_ENV !== 'production';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const storeEnhancers = [];

if (__DEV__ && window.devToolsExtension) {
  // If the user has the "Redux DevTools" browser extension installed, use that.
  storeEnhancers.push(window.devToolsExtension());
}

const middlewareEnhancer = applyMiddleware(...middlewares);
storeEnhancers.unshift(middlewareEnhancer);

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(...storeEnhancers)
  );

  // run sagas
  SagaManager.startSagas(sagaMiddleware);

  if (__DEV__) {
    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
      module.hot.accept('../reducers/rootReducer', () =>
        store.replaceReducer(require('../reducers/rootReducer').default)
      );

      module.hot.accept('../sagas/SagaManager', () => {
        SagaManager.cancelSagas(store);
        require('../sagas/SagaManager').default.startSagas(sagaMiddleware);
      });
    }
  }

  return store;
}
