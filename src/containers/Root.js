import React from 'react';
import { connect, Provider } from 'react-redux';

import { changeLocale } from 'actions/i18n';
import { getItems, getBenchoptions, getMods } from 'actions/poe';
import App from 'components/App';

const Root = ({ locale, messages, store, init, version }) => {
  return (
    <Provider store={store}>
      <App {...{ init, locale, messages, version }} />
    </Provider>
  );
};

const mapStateToProps = state => {
  return {
    locale: state.i18n.locale,
    messages: state.i18n.messages,
    version: state.poe.version
  };
};

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(changeLocale('en'));
      dispatch(getItems());
      dispatch(getBenchoptions());
      dispatch(getMods());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
