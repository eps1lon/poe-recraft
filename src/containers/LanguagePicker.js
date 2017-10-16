// @flow
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import { changeLocale } from 'actions/i18n';
import LanguagePicker from 'components/LanguagePicker';
import type { State } from 'reducers/rootReducer';

const mapStateToProps = (state: State) => {
  return {
    item: state.craft.item
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return {
    onChange: (locale: string) => dispatch(changeLocale(locale))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguagePicker);
