import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

const store = configureStore();

const rootEl = document.getElementById('root');

let render = () => {
  const RootAppComponent = require('./containers/Root').default;
  ReactDOM.render(<RootAppComponent store={store} />, rootEl);
};

if (module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderApp = render;
  const renderError = error => {
    const RedBox = require('redbox-react');
    ReactDOM.render(<RedBox error={error} />, rootEl);
  };

  render = () => {
    try {
      renderApp();
    } catch (error) {
      renderError(error);
    }
  };

  module.hot.accept('./containers/Root', () => {
    setTimeout(render);
  });
}

render();
registerServiceWorker();
