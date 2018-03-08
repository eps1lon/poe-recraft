import React, { SFC } from 'react';
import { connect, Provider } from 'react-redux';

import { i18n_actions } from 'state/i18n';
import { poe_actions } from 'state/poe';
import App from 'components/App';
import { State } from 'state';
import { Dispatch, Store } from '../';

export type Props = {
  locale: string;
  messages: { [key: string]: any };
  version: string;
  init: () => void;
  store: Store;
};

const Root: SFC<Props> = ({ locale, messages, store, init, version }) => {
  return (
    <Provider store={store}>
      <App {...{ init, locale, messages, version }} />
    </Provider>
  );
};

const mapStateToProps = (state: State) => {
  return {
    locale: state.i18n.locale,
    messages: state.i18n.messages,
    version: state.poe.version
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    init: () => {
      dispatch(i18n_actions.changeLocale('en'));
      dispatch(poe_actions.getItems());
      dispatch(poe_actions.getBenchoptions());
      dispatch(poe_actions.getMods());
      dispatch(poe_actions.getTags());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
