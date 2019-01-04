import { connect } from 'react-redux';

import App from 'components/App';
import { State } from 'state';
import { i18n_actions, poe_actions } from 'state/actions';
import { Dispatch } from '../';

const mapStateToProps = (state: State) => {
  return {
    locale: state.i18n.locale,
    messages: state.i18n.messages,
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
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
