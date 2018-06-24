import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

const store = configureStore();
export type Store = typeof store;
export type Dispatch = Store['dispatch'];

const rootEl = document.getElementById('root');

let render = () => {
  const RootAppComponent = require('./containers/Root').default;
  ReactDOM.render(<RootAppComponent store={store} />, rootEl);
};

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    setTimeout(render);
  });
}

render();
registerServiceWorker();
