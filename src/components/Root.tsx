import React, { SFC } from 'react';
import { Provider } from 'react-redux';

import App from 'containers/App';
import { Dispatch, Store } from '../';

export type Props = {
  version: string;
  store: Store;
};

const Root: SFC<Props> = ({ store, version }) => {
  return (
    <Provider store={store}>
      <App {...{ version }} />
    </Provider>
  );
};

/**
 * we need to export the type separately for import() type syntax
 * using typeof import("Root") will cause "no call signature"
 * but using import("Root").ControlledRoot will work. Despite resolving this would lead to
 * and equivalent statement?!
 */
export type ComponentType = typeof Root;
export default Root;
