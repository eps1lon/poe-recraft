import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

const store = configureStore();
export type Store = typeof store;
export type Dispatch = Store['dispatch'];

const rootEl = document.getElementById('root');

let render = () => {
  // tslint:disable-next-line: whitespace
  type ComponentType = import('./components/Root').ComponentType;
  const RootAppComponent: ComponentType = require('./components/Root').default;
  ReactDOM.render(<RootAppComponent store={store} version="0.2.0" />, rootEl);
};

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    setTimeout(render);
  });
}

render();
registerServiceWorker();
