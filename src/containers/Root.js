import React from 'react';
import { connect, Provider } from 'react-redux';

import {
  getItems,
  getBenchoptions,
  getMetadata,
  getMods
} from '../actions/poe';
import App from '../components/App';

const Root = ({ store, init }) => {
  return (
    <Provider store={store}>
      <App init={init} />
    </Provider>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(getItems());
      dispatch(getBenchoptions());
      dispatch(getMetadata());
      dispatch(getMods());
    }
  };
};

export default connect(null, mapDispatchToProps)(Root);
