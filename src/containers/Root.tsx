import React, { SFC } from 'react';
import { connect, Provider } from 'react-redux';

import App from 'components/App';
import { State } from 'state';
import { i18n_actions } from 'state/i18n';
import { poe_actions } from 'state/poe';
import { Dispatch, Store } from '../';

export interface Props {
  locale: string;
  messages: { [key: string]: any };
  version: string;
  init: () => void;
  store: Store;
}

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
    messages: state.i18n.messages
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
      dispatch(poe_actions.getEssences());
    }
  };
};

const ControlledRoot = connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
/**
 * we need to export the type separately for import() type syntax
 * using typeof import("Root") will cause "no call signature"
 * but using import("Root").ControlledRoot will work. Despite resolving this would lead to
 * and equivalent statement?!
 */
export type ComponentType = typeof ControlledRoot;
export default ControlledRoot;
