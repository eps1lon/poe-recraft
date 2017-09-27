import React from 'react';
import { connect, Provider } from 'react-redux';

import { getItems, getBenchoptions, getMods } from '../actions/poe';
import App from '../components/App';

const Root = ({ store, init, version }) => {
  return (
    <Provider store={store}>
      <App {...{ init, version }} />
    </Provider>
  );
};

const mapStateToProps = state => {
  return {
    version: state.poe.version
  };
};

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(getItems());
      dispatch(getBenchoptions());
      dispatch(getMods());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
