import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { LanguagePicker } from 'components/language_picker/';
import { State } from 'state';
import { i18n_actions } from 'state/i18n';

const mapStateToProps = (state: State) => {
  return {
    active_locale: state.i18n.locale
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onChange: (locale: string) => dispatch(i18n_actions.changeLocale(locale))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguagePicker);
