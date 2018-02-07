import { connect } from 'react-redux';

import { State } from 'reducers/rootReducer';
import FormattedModName from 'components/i18n/FormattedModName';
import { baseitemInflection } from 'selectors/craft';

const mapStateToProsp = (state: State) => {
  return {
    inflection: baseitemInflection(state)
  };
};

export default connect(mapStateToProsp)(FormattedModName);
