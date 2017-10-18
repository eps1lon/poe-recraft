// @flow
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import { changeLocale } from 'actions/i18n';
import { LanguagePicker } from 'components/language_picker/';
import type { State } from 'reducers/rootReducer';

const mapStateToProps = (state: State) => {
  return {
    active_locale: state.i18n.locale
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return {
    onChange: (locale: string) => dispatch(changeLocale(locale))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguagePicker);
