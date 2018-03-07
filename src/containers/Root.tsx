import React, { SFC } from 'react';
import { connect, Provider } from 'react-redux';

import { changeLocale } from 'actions/i18n';
import { getItems, getBenchoptions, getMods, getTags } from 'actions/poe';
import App from 'components/App';
import { State } from 'reducers/rootReducer';
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
      dispatch(changeLocale('en'));
      dispatch(getItems());
      dispatch(getBenchoptions());
      dispatch(getMods());
      dispatch(getTags());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
