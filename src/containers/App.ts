import { connect } from 'react-redux';

import { i18n_actions } from 'state/i18n';
import { poe_actions } from 'state/poe';
import App from 'components/App';
import { State } from 'state';
import { Dispatch } from '../';

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
