import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect, Provider } from 'react-redux';

import { changeLocale } from 'actions/i18n';
import { getItems, getBenchoptions, getMods } from 'actions/poe';
import App from 'components/App';

const Root = ({ locale, messages, store, init, version }) => {
  return (
    <Provider store={store}>
      <IntlProvider locale={locale} messages={messages}>
        <App {...{ init, version }} />
      </IntlProvider>
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
